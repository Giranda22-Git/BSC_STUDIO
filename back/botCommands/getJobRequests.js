const bot = require('./bot_connect.js')
const mongoJobRequest = require('../models/jobRequests.js')
const mongoUsers = require('../models/users.js')

module.exports =
bot.command('getJobRequests', async (ctx) => {
  const initiator = await mongoUsers.findOne({ telegramId: ctx.message.from.id }).exec()
  if (initiator.accessLevel <= 2) {
    const result = await mongoJobRequest.find().exec()
    ctx.reply(JSON.stringify(result, true, 4))
  } else (
    ctx.reply('у вас не достаточно прав для выполнения данной команды')
  )
})
