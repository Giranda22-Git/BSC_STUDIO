const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 1000 })
const telegraf = require('telegraf')
const {uid} = require('uid')
const fs = require('fs')

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

const clients = new Set()

init(serverData)

async function init(serverData) {
  await mongoose.connect(serverData.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connection.once('open', () => {
    app.listen(serverData.PORT, '0.0.0.0', (err) => {
      if (err) return new Error(`error in starting server, error: ${err}`)
      else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
    })

    app.use('/messages', require('./endPoints/messages.js'))
    //app.use('/auctions', require('./endPoints/auctions.js'))

    // telegram bot
    // chat id -423939146
    const bot = new telegraf('1486601848:AAF6cLztC7SlVfGV1Epal3N6tVfJVHZ245A')

    bot.start((ctx) => {
      ctx.reply('started choose keyboard\n/messages\n/orders')
    })

    bot.command('messages', (ctx) => {
      ctx.reply('messages', {
        reply_markup: {
          keyboard: [
            [
              { text: "count of users"},
              { text: "all users connection id" }
            ],
            [
              { text: "all users chat with phone number" }
            ],
            [
              { text: "/messages" }
            ]
          ],
          resize_keyboard: true,
          one_time_keyboard: false
        }
      })
    })

    bot.hears('all users chat with phone number', async (ctx) => {
      const allChats = await mongoMessages.find()
      console.log('check',allChats[allChats.length - 1].messages.length)
      const keyboardArray = new Array()
      allChats.forEach(chat => {
        console.log('check',chat.messages.length)
        keyboardArray.push([ { text: `${chat.userName}: ${chat.phoneNumber}`, callback_data: `findUserByPhoneNumber(${chat.phoneNumber})`  } ])
        bot.action(`findUserByPhoneNumber(${chat.phoneNumber})`, async (context) => {
          let outputChatFormat = `
userName: ${chat.userName}
phoneNumber: ${chat.phoneNumber}
messages: \n`
          let check = 0
          chat.messages.forEach(message => {
            console.log(message.data.message)
            outputChatFormat += `
------------------------

\tdate: ${new Date(message.data.timestamp).toLocaleString("ru")}
\tuserName: ${message.data.userName}
\tphoneNumber: ${message.data.phoneNumber}
\tmessage: \n\n\t\t\t\t${message.data.message}\n\n`
          })
          bot.action(`downloadAsFile(${chat.phoneNumber})`, async (contextFile) => {
            const generateFileName = chat.phoneNumber + uid(16) + '.txt'
            const pathFile = `./customDocuments/${generateFileName}`
            fs.open(pathFile, 'w', (err, fd) => {
              if (!err) {
                fs.writeFile(fd, outputChatFormat, error => {
                  if (error) console.log(error)
                })
                fs.close(fd, error => {
                  if (error)
                    console.log(error)
                })
              }
            })
            contextFile.telegram.sendDocument('-358075072', { source: pathFile })
          })
          context.reply(outputChatFormat, {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: 'download as file', callback_data: `downloadAsFile(${chat.phoneNumber})` }
                ]
              ]
            }
          })
        })
      }),
      ctx.reply('all users:', {
        reply_markup: {
          inline_keyboard: keyboardArray
        }
      })
    })

    // command count of users
    bot.hears('count of users', (ctx) => {
      ctx.reply(clients.size)
    })

    //command array all users
    bot.hears('all users connection id', (ctx) => {
      if (clients.size !== 0) {
        let allUsersId = new String()

        clients.forEach(client => {
          allUsersId += client.uid + '\n'
        })

        ctx.reply(allUsersId)
      } else {
        ctx.reply('users count of zero')
      }
    })

    // error truster
    wss.on('error', err => {
      console.log(err)
    })

    // event on connection
    wss.on('connection', async ws => {
      const newConnection = {
        uid: uid(4),
        connection: ws
      }
      clients.add(newConnection)
      console.log(`connected: ${newConnection.uid}`)
      bot.command('send', (ctx) => {
        const telegramMessage = ctx.message.text.replace('/send', '')
        const queryConnectionUID = telegramMessage.substr(telegramMessage.indexOf('uid: ') + 5, telegramMessage.indexOf(';') - 6)
        clients.forEach(client => {
          if (client.uid === queryConnectionUID) {
            const newTelegramMessage = {
              action: 'saveFromAdminMessage',
              agent: 'telegram',
              data: {
                phoneNumber: '+7(705)-553-99-66',
                userName: 'BSC STUDIO',
                message: telegramMessage.substr(telegramMessage.indexOf(';') + 2),
                timestamp: new Date()
              }
            }
            client.connection.send(JSON.stringify(newTelegramMessage))
            ctx.reply('сообщение успешно отправлено')
          } else {
            const allClientsId = new Array()
            clients.forEach(client => {
              allClientsId.push(client.uid)
            })
            if (!allClientsId.includes(queryConnectionUID))
              ctx.reply(`uid is wrong; ${client.uid} != ${queryConnectionUID}`)
          }
        })
      })
      bot.launch()

      ws.on('message', async msg => {
        msg = JSON.parse(msg)
        const data = msg.data
        data.timestamp = new Date()
        if (msg.action === 'message') {
          const newMessage = {
            action: 'replyMessage',
            agent: 'server',
            data: {
              phoneNumber: data.phoneNumber,
              userName: data.userName,
              message: data.message,
              timestamp: new Date()
            }
          }

          newMessage.data.result = await mongoMessages.updateOne({ phoneNumber: data.phoneNumber }, {$push: { messages: newMessage }})

          ws.send(JSON.stringify(newMessage))

          bot.telegram.sendMessage('-358075072',
            `new message sended from\nuid: ${newConnection.uid}\ndate: ${data.timestamp.toLocaleString("ru")}\nname: ${data.userName}\nphone: ${data.phoneNumber}\nmessage:\n  ${data.message}`
          )
        }
      })

      // event on user disconnection
      ws.on('close', () => {
        clients.delete(newConnection)
        console.log(`deleted: ${newConnection.uid}`)
      })
    })
    bot.launch()
  })
  mongoose.connection.emit('open')
}