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
            phoneNumber: data.phoneNumber
        })
        const result = await newMessages.save()
        res.status(200).json(result)
    }
})

module.exports = router
