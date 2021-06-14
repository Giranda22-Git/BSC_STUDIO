const bot = require('./bot_connect.js')
const mongoUsers = require('../models/users.js')

module.exports =
bot.command('getUsers', async (ctx) => {
  const initiator = await mongoUsers.findOne({ telegramId: ctx.message.from.id }).exec()
  if (initiator.accessLevel <= 2) {
    const result = await mongoUsers.find().exec()
    ctx.reply(JSON.stringify(result, true, 4))
  } else {
    ctx.reply('у вас не достаточно прав для выполнения данной команды')
  }
})
