const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 1000 })
const {uid} = require('uid')
const fs = require('fs')
const axios = require('axios')

const serverData = require('./staticData/mountedData.js')

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

    // telegram bot
    // chat id -423939146
    const bot = require('./botCommands/bot_connect.js')

    require('./botCommands/start.js')
    require('./botCommands/jobRequest.js')
    require('./botCommands/accessJobRequest.js')
    require('./botCommands/getJobRequests.js')
    require('./botCommands/getUsers.js')
    require('./botCommands/createOrder.js')
    require('./botCommands/endCreateOrder.js')


    bot.on('document', async (ctx) => {
      const fileExtension = ctx.update.message.document.file_name.split('.')[1]
      const {file_id: fileId} = ctx.update.message.document
      ctx.telegram.getFileLink(fileId)
        .then(url => {
          axios({url, responseType: 'stream'}).then(response => {
            return new Promise(() => {
              response.data.pipe(fs.createWriteStream(`${__dirname}/tmp/technicalTasks/${ctx.update.message.from.id}.${fileExtension}`))
                .on('finish', () => ctx.reply('файл успешно сохранен'))
                .on('error', () => ctx.reply('произошла какая то ошибка'))
            })
          })
        })
    });

    bot.on('photo', async (ctx) => {
      console.log(ctx.update.message.photo[3])
      const {file_id: fileId} = ctx.update.message.photo[3]
      ctx.telegram.getFileLink(fileId)
        .then(url => {
          axios({url, responseType: 'stream'}).then(response => {
            return new Promise(() => {
              response.data.pipe(fs.createWriteStream(`${__dirname}/tmp/structures/${ctx.update.message.from.id}.jpg`))
                .on('finish', () => ctx.reply('файл успешно сохранен'))
                .on('error', () => ctx.reply('произошла какая то ошибка'))
            })
          })
        })
    })

    // telegram admin buttons
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
            contextFile.telegram.sendDocument('-411803300', { source: pathFile })
          })
          context.reply('скачать ?', {
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

    // send message from admin to user
    bot.on('message', async (ctx) => {
      console.log(ctx.message)

      if (ctx.message.reply_to_message) {
        if (
          ctx.message.reply_to_message.from.is_bot === true &&
          ctx.message.reply_to_message &&
          ctx.message.reply_to_message.text.substring(0, 11) === '#newMessage'
        ) {
          const replyMessage = ctx.message.reply_to_message.text
          const replyPhoneNumber = replyMessage.substring(replyMessage.indexOf('phone: ') + 7, replyMessage.indexOf('phone: ') + 7 + 12)

          const MessageForSendAdminUser = {
            action: 'messageFromAdmin',
            agent: 'telegram',
            data: {
              phoneNumber: '+7(705)-553-99-66',
              userName: 'BSC STUDIO',
              message: ctx.message.text,
              timestamp: new Date()
            }
          }

          const updateMessageDataForSendAdminUser = await mongoMessages.updateOne(
            { phoneNumber: replyPhoneNumber },
            { $push: { messages: MessageForSendAdminUser } }
          )

          const clientsHasArrayForSendAdminUser = new Array()
          clients.forEach(value => {
            clientsHasArrayForSendAdminUser.push(String(value.phoneNumber))
          })

          if (updateMessageDataForSendAdminUser.ok && !clientsHasArrayForSendAdminUser.includes(replyPhoneNumber)) {
            ctx.reply('сообщение успешно отправлено, но пользователь сейчас не в сети')
          }
          else if (updateMessageDataForSendAdminUser.ok && clientsHasArrayForSendAdminUser.includes(replyPhoneNumber)) {
            for (let clientForSendAdminUser of clients) {
              if (clientForSendAdminUser.phoneNumber === replyPhoneNumber) {
                clientForSendAdminUser.connection.send(JSON.stringify(MessageForSendAdminUser))
                ctx.reply('сообщение успешно отправлено')
              }
            }
          }
          else {
            ctx.reply('Сообщение не отправлено, скорее всего такого пользователя не существует')
          }
        }
      }
    })

    // event on connection
    wss.on('connection', async (ws, data) => {
      const newConnection = {
        connection: ws,
        phoneNumber: data.url.substring(1)
      }
      clients.add(newConnection)
      console.log(`connected: ${newConnection.phoneNumber}`)

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

          bot.telegram.sendMessage('-411803300',
            `#newMessage\ndate: ${data.timestamp.toLocaleString("ru")}\nname: ${data.userName}\nphone: ${data.phoneNumber}\nmessage:\n  ${data.message}`
          )
        }
      })

      // event on user disconnection
      ws.on('close', () => {
        clients.delete(newConnection)
        console.log(`deleted: ${newConnection.phoneNumber}`)
      })
    })
    bot.launch()
  })
  mongoose.connection.emit('open')
}