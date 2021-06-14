const bot = require('./bot_connect.js')
const mongoJobRequest = require('../models/jobRequests.js')
const mongoUsers = require('../models/users.js')

module.exports =
bot.command('jobRequest', async (ctx) => {
  ctx.message.text = ctx.message.text.substring('jobRequest'.length + 1, ctx.message.text.length).replace(/\s/g, '')
  const data = ctx.message.text.split(',')
  const checkJobRequest = await mongoJobRequest.findOne({ phoneNumber: data[0] }).exec()
  const checkUser = await mongoUsers.findOne({ phoneNumber: data[0] }).exec()
  if (data.length === 3) {
    if (data[0].length > 10 && data[1].length > 2 && data[2].length > 2) {
      if (!checkJobRequest) {
        if (!checkUser) {
          const newJobRequest = new mongoJobRequest({
            phoneNumber: data[0],
            firstName: data[1],
            lastName: data[2],
            telegramId: ctx.message.from.id
          })
          await newJobRequest.save()
          ctx.reply('спасибо мы обязательно рассмотрим вашу заявку')
        } else {
          ctx.reply('Вы уже состоите в нашей компании')
        }
      } else {
        ctx.reply('Вы уже подавали заявку, пожалуйста подождите пока ее не проверят')
      }
    } else {
      ctx.reply('не правильно введены данные, схема: /jobRequest <phoneNumber>, <FirstName>, <LastName>')
    }
  } else {
    ctx.reply('не правильно введены данные, схема: /jobRequest <phoneNumber>, <FirstName>, <LastName>')
  }
})
