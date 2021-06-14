const router = require('express').Router()

const mongoMessages = require('../models/messages.js')


// begin find all messages
router.get('/', async (req, res) => {
  const result = await mongoMessages.find().exec()
  res.status(200).json(result)
})
// end find all messages


// begin find message by phoneNumber
router.get('/:phone', async (req, res) => {
  const result = await mongoMessages.find({ phoneNumber: req.params.phone }).exec()
  res.status(200).json(result)
})
// end find message by phoneNumber


// begin create new chat
router.post('/', async (req, res) => {
  const data = req.body
  const query = await mongoMessages.findOne({ phoneNumber: data.phoneNumber }).exec()
  if (query !== null) res.status(200).json(query)
  else {
    const newMessages = new mongoMessages({
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      messages: [
        {
          action: 'created',
          agent: 'server',
          data: {
            userName: 'BSC STUDIO',
            phoneNumber: '+7(705)-553-99-66',
            message: "Мы ответим вам в течении 10 минут",
            timestamp: new Date()
          }
        }
      ]
    })
    const result = await newMessages.save()
    res.status(200).json(result)
  }
})
// end create new chat

module.exports = router
