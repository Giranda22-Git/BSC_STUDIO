const bot = require('./bot_connect.js')
const mongoJobRequest = require('../models/jobRequests.js')
const mongoUsers = require('../models/users.js')

module.exports =
bot.command('accessJobRequest', async (ctx) => {
  const initiator = await mongoUsers.findOne({ telegramId: ctx.message.from.id }).exec()
  ctx.message.text = ctx.message.text.substring('accessJobRequest'.length + 1, ctx.message.text.length).replace(/\s/g, '')
  const data = ctx.message.text.split(',')
  if (initiator.accessLevel === 1 && data.length >= 2) {
    const tmpJobRequest = await mongoJobRequest.findOne({ phoneNumber: data[0] }).exec()
    if (data[1] === 'ok' && data.length === 3) {
      const newUser = new mongoUsers({
        phoneNumber: tmpJobRequest.phoneNumber,
        firstName: tmpJobRequest.firstName,
        lastName: tmpJobRequest.lastName,
        telegramId: tmpJobRequest.telegramId,
        accessLevel: data[2]
      })
      const newUserData = await newUser.save()
      ctx.reply('добавлен новый сотридник:\n'+newUserData)
    }
    await mongoJobRequest.deleteOne({ phoneNumber: tmpJobRequest.phoneNumber })
    ctx.reply('заявка была успешно удалена')
  } else {
    ctx.reply('у вас не достаточно прав для выполнения данной команды')
  }
})
