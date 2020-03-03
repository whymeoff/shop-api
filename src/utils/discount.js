const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shop-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const Product = require('../models/product')

const discount = async () => {
    try {
        const products = await Product.find({ discount: false })
        const date = new Date().getDate()
        const ms = 2592000000

        for (let i = 0; i < products.length; i++) {
            if (product.creationDate + ms > date  ) {
                await Product.findByIdAndUpdate(product._id, { discount: true })
            }
        }

    } catch (e) {
        console.log(e)
    }

    await mongoose.disconnect()
}

discount()