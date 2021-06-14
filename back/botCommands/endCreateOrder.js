const bot = require('./bot_connect.js')
const createOrder = require('../staticData/activeCreateOrder.js')

module.exports = bot.command('endCreateOrder', async (ctx) => {
  console.log(createOrder, 'end')
})