const mongoose = require('mongoose')

const order = new mongoose.Schema({
    clientName: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    technicalTaskMessage: {
        type: String,
    },
    technicalTaskFile: {
        type: String
    },
    references: {
        type: [String]
    },
    structure: {
        type: String
    },
    progressStep: {
        type: Number,
        default: 1
    },
    cost: {
        type: Number
    },
    status: {
        type: String,
        enum: ['initializing', 'inWork', 'PreFinished', 'Finished'],
        default: 'initializing'
    },
    deadLineStart: {
        type: Date,
        default: new Date
    },
    deadLineFinish: {
        type: Date
    }
})

const orders = mongoose.model('orders', order)
module.exports = orders