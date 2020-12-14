const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 2000 })

const telegraf = require('telegraf')
//1486601848:AAF6cLztC7SlVfGV1Epal3N6tVfJVHZ245A

const bot = new telegraf('1486601848:AAF6cLztC7SlVfGV1Epal3N6tVfJVHZ245A')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍👍👍👍👍👍👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

wss.on('connection', async ws => {
  ws.on('message', async msg => {
    msg = JSON.parse(msg)
    const data = msg.data
  })
})