const router = require('express').Router()

const mongoMessages = require('../models/messages.js')

router.get('/', async (req, res) => {
    const result = await mongoMessages.find().exec()
    res.status(200).json(result)
})

router.get('/:phone', async (req, res) => {
    const result = await mongoMessages.find({ phoneNumber: req.params.phone }).exec()
    res.status(200).json(result)
})

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
                        userName: data.userName,
                        phoneNumber: data.phoneNumber,
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

router.post('/messageFromAdmin', async (req, res) => {
    const data = req.body
    console.log(data, data.data)
    const query = await mongoMessages.findOne({ phoneNumber: data.phoneNumber }).exec()
    if (query !== null) {
        const newMessage = {
            action: 'saveAdminMessage',
            agent: 'telegram',
            data: {
              phoneNumber: data.data.data.phoneNumber,
              userName: data.data.data.userName,
              message: data.data.data.message,
              timestamp: new Date()
            }
        }
        const result = await mongoMessages.updateOne({ phoneNumber: data.phoneNumber }, {$push: { messages: newMessage }})
        if (result.ok) res.status(200).json(newMessage)
        else res.sendStatus(500)
    } else res.status(404).json(query)
})

module.exports = router
