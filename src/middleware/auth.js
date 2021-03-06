// Auth middleware

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.status(401)
    }
}