const mongoose = require('mongoose')
const userOneID = new mongoose.Types.ObjectId()

module.exports = {
    _id: userOneID,
    fullName: 'Fullname',
    age: 23,
    role: 'cashier',
    email: 'email@gmail.com',
    password: 'SomePassword123'
}