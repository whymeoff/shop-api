const isCashier = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'cashier') return next()
    } else {
        return res.status(401).send()
    }

    return res.status(403).send()
}

const isSeller = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'seller') return next()
    } else {
        return res.status(401).send()
    }

    return res.status(403).send()
}

const isAccountant = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'accountant') return next()
    } else {
        return res.status(401).send()
    }

    return res.status(403).send()
}

const isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') return next()
    } else {
        return res.status(401).send()
    }

    return res.status(403).send()
}

module.exports = {
    isCashier,
    isSeller,
    isAccountant,
    isAdmin
}