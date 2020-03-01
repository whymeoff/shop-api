const mongoose = require('mongoose')

const CheckSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cashier: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    creationDate: {
        type: String,
        default: Date.now
    },
    orderDate: {
        type: String
    }
})

module.exports = mongoose.model('check', CheckSchema)