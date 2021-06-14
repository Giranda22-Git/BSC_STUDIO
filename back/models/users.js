const mongoose = require('mongoose')

const user = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  post: {
    type: String,
    default: ''
  },
  accessLevel: {
    type: Number
  },
  telegramId: {
    type: String
  },
  activeOrders: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
})

const mongoUsers = mongoose.model('users', user)
module.exports = mongoUsers