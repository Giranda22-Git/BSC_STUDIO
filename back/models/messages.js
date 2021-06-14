const mongoose = require('mongoose')

const message = new mongoose.Schema({
  userName: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  messages: {
    type: Array,
    default: []
  }
})

const messages = mongoose.model('messages', message)
module.exports = messages