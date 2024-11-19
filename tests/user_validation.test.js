const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

test('Testing user validation', async () => {
    
    await User.deleteMany({})

    const newUser =
    {
        name: "Marten",
        username: "marten2",
        password: "martenspassword",

    }
   await api.post('/api/users')
    .send(newUser)
    .expect(201)

    const newUser2 =
    {
        name: "Marten",
        username: "ma",
        password: "martenspassword",

    }
   await api.post('/api/users')
    .send(newUser2)
    .expect(400)

    const newUser3 =
    {
        name: "Marten",
        username: "marten3",
        password: "ma",

    }
   await api.post('/api/users')
    .send(newUser3)
    .expect(400)
})