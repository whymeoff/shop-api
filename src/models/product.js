const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('product', ProductSchema)