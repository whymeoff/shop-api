const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('order', OrderSchema)