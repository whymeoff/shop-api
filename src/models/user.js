const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        validate(value) {
            const defaultValues = ['cashier', 'seller', 'accountant', 'admin']
            const matchValues = defaultValues.filter((el) => {
                return el === value
            })

            if (matchValues.length === 0) throw new Error('Invalid role type')
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid email')
        }
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

module.exports = mongoose.model('user', UserSchema)