require('./db/mongoose')
const express = require('express')

// Express settings
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Routers
app.use('/admin', require('./routers/admin'))
app.use('/seller', require('./routers/seller'))
app.use('/cashier', require('./routers/cashier'))
app.use('/accountant', require('./routers/accountant'))

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})