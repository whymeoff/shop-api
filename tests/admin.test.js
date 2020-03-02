const request = require('supertest')
const app = require('../src/app')

const User = require('../src/models/user')
const Product = require('../src/models/product')
const Order = require('../src/models/order')
const Check = require('../src/models/cashierCheck')
const users = require('../fixtures/users')
const products = require('../fixtures/products')

let cookie

beforeAll(async () => {
    // To clear test database
    await User.deleteMany()
    Product.deleteMany({}, () => { console.log('Products deleted') })
    Order.deleteMany({}, () => { console.log('Orders deleted') })
    Check.deleteMany({}, () => { console.log('Checks deleted') })

    await new User(users.admin).save()

    // Auth admin account
    await request(app).post('/user/login')
        .send({ email: users.admin.email, password: users.admin.password })
        .expect(res => {
            cookie = res.headers['set-cookie']
        })
})

test('Should create a new user', async () => {
    const res = await request(app)
        .post('/admin/createStaff')
        .set('cookie', cookie)
        .send({ ...users.test })
        .expect(201)

    // Check for password (hashed or not)
    const user = await User.findById(res.body._id)
    expect(user.password).not.toBe('SomePassword123')
})

test('Should edit profile that already exist', async () => {
    const res = await request(app)
        .patch(`/admin/editStaff/${users.test._id}`)
        .set('cookie', cookie)
        .send({ password: '123123123', fullName: 'NewName' })
        .expect(200)

    // Check for password (hashed or not)
    const user = await User.findById(res.body._id)
    expect(user.password).not.toBe('SomePassword123')
})

test('Should delete profile', async () => {
    const res = await request(app)
        .delete(`/admin/deleteStaff/${users.test._id}`)
        .set('cookie', cookie)
        .send()
        .expect(200)

    // Check if profile exist
    const user = await User.findById(users.test._id)
    expect(user).toBeNull()
})

test('Should create product', async () => {
    const res = await request(app)
        .post('/admin/createProduct')
        .set('cookie', cookie)
        .send(products[0])
        .expect(201)

    const product = await Product.findById(res.body._id)
    expect(product).not.toBeNull()
})

test('Should edit product that already exists', async () => {
    await request(app)
        .patch(`/admin/editProduct/${products[0]._id}`)
        .set('cookie', cookie)
        .send({
            name: 'New Name'
        })
        .expect(200)
    
    // Check if product edited
    const product = await Product.findById(products[0]._id)
    expect(product.name).toBe('New Name')
})

test('Should delete product', async () => {
    await request(app)
    .delete(`/admin/deleteProduct/${products[0]._id}`)
    .set('cookie', cookie)
    .send()
    .expect(200)

    // Check if product exists
    const product = await Product.findById(products[0]._id)
    expect(product).toBeNull()
})