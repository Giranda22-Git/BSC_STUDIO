const bot = require('./bot_connect.js')
module.exports =
bot.command('start',(ctx) => {
  console.log(__dirname)
  ctx.reply('started choose keyboard\n/messages\n/orders')
})