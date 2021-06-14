const mongoose = require('mongoose')

const request = new mongoose.Schema({
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
  telegramId: {
    type: String
  }
})

const mongoJobRequest = mongoose.model('jobrequests', request)
module.exports = mongoJobRequest