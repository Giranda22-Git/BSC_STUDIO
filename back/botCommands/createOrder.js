const bot = require('./bot_connect.js')
const createOrder = require('../staticData/activeCreateOrder.js')
const mongoUsers = require('../models/users.js')

module.exports = bot.command('createOrder', async (ctx) => {
  const initiator = await mongoUsers.findOne({ telegramId: ctx.message.from.id }).exec()
  ctx.message.text = ctx.message.text.substring('createOrder'.length + 1, ctx.message.text.length).replace(/\s/g, '')
  const data = ctx.message.text.split(',')
  if (initiator.accessLevel === 1 && data.length >= 5) {
    createOrder.status = true
    if (ctx.message.text !== '') {
      createOrder.data.clientName = data[0]
      createOrder.data.phoneNumber = data[1]
      createOrder.data.technicalTaskMessage = data[2]
      createOrder.data.cost = data[3]
      createOrder.data.deadLineFinish = data[4]
      createOrder.owner = ctx.message.from.id
      ctx.reply(JSON.stringify(createOrder.data, true, 4))
      ctx.reply(`
        /addStructurePhoto - после введения все отправленные вами фотографии будут сохранены в качестве картинок структуры проекта\n
        /addTechnicalTaskDocument - после введения все отправленные вами документы будут прикреплены к данному проекту в качестве технического задания\n
        /endCreateOrder - заканчивает процесс создания заказа
      `)
    }
    else {
      createOrder.status = false
      ctx.reply('у вас не достаточно прав для выполнения данной команды')
    }
  }
})