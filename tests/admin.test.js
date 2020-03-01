const request = require('supertest')
const app = require('../src/app')

const User = require('../src/models/user')
const Product = require('../src/models/product')
const userOne = require('../fixtures/user')
const products = require('../fixtures/products')

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should create a new user', async () => {
    const res = await request(app)
        .post('/admin/createStaff')
        .send({
            fullName: 'Fullname',
            age: 23,
            role: 'cashier',
            email: 'fullname@gmail.com',
            password: 'SomePassword123'
        })
        .expect(201)

    // Check for password (hashed or not)
    const user = await User.findById(res.body._id)
    expect(user.password).not.toBe('SomePassword123')
})

test('Should edit profile that already exist', async () => {
    const res = await request(app)
        .patch(`/admin/editStaff/${userOne._id}`)
        .send({
            fullName: 'Fullname',
            age: 23,
            role: 'cashier',
            email: 'fullname@gmail.com',
            password: 'SomePassword123'
        })
        .expect(200)

    // Check for password (hashed or not)
    const user = await User.findById(res.body._id)
    expect(user.password).not.toBe('SomePassword123')
})

test('Should delete profile', async () => {
    const res = await request(app)
        .delete(`/admin/deleteStaff/${userOne._id}`)
        .send()
        .expect(200)

    // Check if profile exist
    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should create product', async () => {
    const res = await request(app)
        .post('/admin/createProduct')
        .send(products[0])
        .expect(201)
})

test('Should edit product that already exists', async () => {
    await request(app)
        .patch(`/admin/editProduct/${products[0]._id}`)
        .send({
            name: 'New Name'
        })
        .expect(200)
})

test('Should delete product', async () => {
    await request(app)
    .delete(`/admin/deleteProduct/${products[0]._id}`)
    .send()
    .expect(200)

    // Check if product exists
    const product = await Product.findById(products[0]._id)
    expect(product).toBeNull()
})