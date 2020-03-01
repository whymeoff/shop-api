require('./db/mongoose')
const express = require('express')

// Express settings
const app = express()

app.use(express.json())

// Routers
app.use('/admin', require('./routers/admin'))
app.use('/seller', require('./routers/seller'))
app.use('/cashier', require('./routers/cashier'))
app.use('/accountant', require('./routers/accountant'))

module.exports = app