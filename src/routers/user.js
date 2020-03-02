const express = require('express')
const validator = require('validator')
const passport = require('passport')
const auth = require('../middleware/auth')
const User = require('../models/user')

const router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
    // console.log(res.req.session)
    res.send()
})

router.post('/logout', auth, async (req, res) => {
    req.logOut()
    return res.send()
})

module.exports = router