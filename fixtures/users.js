const mongoose = require('mongoose')

const cashier = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Fullname',
    age: 23,
    role: 'cashier',
    email: 'email1@gmail.com',
    password: 'SomePassword123'
}

const seller = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Fullname',
    age: 23,
    role: 'seller',
    email: 'email2@gmail.com',
    password: 'SomePassword123'
}

const accountant = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Fullname',
    age: 23,
    role: 'accountant',
    email: 'email3@gmail.com',
    password: 'SomePassword123'
}

const admin = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Fullname',
    age: 23,
    role: 'admin',
    email: 'email4@gmail.com',
    password: 'SomePassword123'
}

const test = {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Fullname',
    age: 23,
    role: 'cashier',
    email: 'test@gmail.com',
    password: 'SomePassword123'
}

module.exports = {
    admin,
    seller,
    cashier,
    accountant,
    test
}