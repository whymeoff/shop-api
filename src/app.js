require('./db/mongoose')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const FileStore = require('connect-loki')(session)

// Passport init
const initializePassport = require('./config/passport-config')
initializePassport(passport)

// Express settings
const app = express()

// Passport settings
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
        maxAge: 1000*60*60*24
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

// Routers
app.use('/user', require('./routers/user'))
app.use('/admin', require('./routers/admin'))
app.use('/seller', require('./routers/seller'))
app.use('/cashier', require('./routers/cashier'))
app.use('/accountant', require('./routers/accountant'))

module.exports = app