const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 1000 })

const serverData = {
  mongoUrl: 'mongodb://localhost:27017/BSC_STUDIO',
  serverUrl: 'http://localhost:3000/',
  PORT: 3000
}

const app = express()
const mongoMessages = require('./models/messages.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.contentType('application/json')
  next()
})
app.use(cors())

init(serverData)

async function init(serverData) {
  await mongoose.connect(serverData.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  mongoose.connection.once('open', () => {
    app.listen(serverData.PORT, (err) => {
      if (err) return new Error(`error in starting server, error: ${err}`)
      else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
    })

    app.use('/messages', require('./endPoints/messages.js'))
    //app.use('/auctions', require('./endPoints/auctions.js'))

    wss.on('connection', async ws => {
      const all = await mongoMessages.find().exec()
      ws.send(JSON.stringify({
        action: 'sendData',
        agent: 'server',
        data: {
          all: all
        }
      }))

      ws.on('message', async msg => {
        msg = JSON.parse(msg)
        const data = msg.data

        if (msg.action === 'message') {
          const result = await mongoMessages.updateOne({ phoneNumber: data.phoneNumber }, {$push: { messages: data.message }})
          ws.send(JSON.stringify({
            action: 'sendMessage',
            agent: 'server',
            data: {
              result: result,
              phoneNumber: data.phoneNumber,
              userName: data.userName,
              message: data.message
            }
          }))
        }
      })
    })
  })
  mongoose.connection.emit('open')
}