const mongoose = require('mongoose')

module.exports = [
    {
        name: 'Name1',
        description: 'Description1',
        price: 100,
        creationDate: new Date().getTime(),
        _id: new mongoose.Types.ObjectId()
    },
    {
        name: 'Name2',
        description: 'Description2',
        price: 123,
        creationDate: new Date(2019, 1, 15).getTime(),
        _id: new mongoose.Types.ObjectId()
    },
    {
        name: 'Name3',
        description: 'Description3',
        price: 555,
        creationDate: new Date(2019, 7, 4).getTime(),
        _id: new mongoose.Types.ObjectId()
    },
    {
        name: 'Name4',
        description: 'Description4',
        price: 201,
        creationDate: new Date(2019, 4, 4).getTime(),
        _id: new mongoose.Types.ObjectId()
    },
    {
        name: 'Name5',
        description: 'Description5',
        price: 201,
        creationDate: new Date(2018, 4, 4).getTime(),
        _id: new mongoose.Types.ObjectId()
    }
]