const User = require('../models/user')
const Product = require('../models/product')

const createStaff = async (req, res) => {
    const user = new User({...req.body})
    
    try {
        await user.save()
        return res.status(201).send(user)
    } catch (e) {
        return res.status(400).send()
    }
}

const editStaff = async (req, res) => {
    const allowedUpdates = ['fullName', 'age', 'role', 'email', 'password']
    const updates = Object.keys(req.body)

    const updatesBool = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    
    if (!updatesBool) return res.status(400).send({error: 'Invalid updates'})

    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).send()

        updates.forEach((key) => {
            user[key] = req.body[key]
        })

        await user.save()
        res.send(user)
    } catch (e) {
        return res.status(400).send()
    }
}

const deleteStaff = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).send()

        return res.send(user)
    } catch (e) {
        return res.status(400).send()
    }
}

const createProduct = async (req, res) => {
    const product = new Product({...req.body})

    try {
        await product.save()
        return res.status(201).send(product)
    } catch (e) {
        return res.status(400).send()
    }
}

const editProduct = async (req, res) => {
    const allowedUpdates = ['name', 'description', 'price']
    const updates = Object.keys(req.body)

    const updatesBool = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    
    if (!updatesBool) return res.status(400).send({error: 'Invalid updates'})

    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).send()

        updates.forEach((key) => {
            product[key] = req.body[key]
        })

        await product.save()
        res.send(product)
    } catch (e) {
        return res.status(400).send()
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).send()

        return res.send(product)
    } catch (e) {
        return res.status(400).send()
    }    
}

module.exports = {
    createStaff,
    editStaff,
    deleteStaff,
    createProduct,
    editProduct,
    deleteProduct
}