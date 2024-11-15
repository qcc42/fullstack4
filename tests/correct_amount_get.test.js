
const assert = require('assert')
const {test} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

test('correct amount of blogs are returned', async () => {
   await Blog.deleteMany({}) 
   const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  
  const promiseArray = blogs.map(e => new Blog(e).save())
  await Promise.all(promiseArray)

  const preliminaryBlogs = await api.get('/api/blogs/')
  const preliminaryBody = preliminaryBlogs.body
  const preliminaryLength = preliminaryBody.length

  let newBlog =
  {
    _id: "5a422bc61b54a676235d17fc" ,
    title: "Mårten's Blog",
    author: "Mårten Jern",
    url: "http://marten.jern.dummy.com",
    likes: 999999999,
    __v: 0
  }  
  await api.post('/api/blogs/')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

const returnedBlogs = await api.get('/api/blogs/')
const body = returnedBlogs.body
console.log(body)
const id = newBlog._id
delete newBlog._id
delete newBlog.__v
newBlog.id = id
console.log(newBlog)
assert(body.length === preliminaryLength+1)
assert.deepEqual(body[body.length-1], newBlog)
})


test('null likes defualts to 0', async () =>
  {
    await Blog.deleteMany({}) 
    const blog =  {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    } 
    await api.post('/api/blogs')
    .send(blog)

    const ret = await api.get('/api/blogs/')
    assert.strictEqual(ret.body[0].likes, 0)
  })

  test('missing url or titles results in response 400', async () => {
    await Blog.deleteMany({})
    const blog =  {
      _id: "5a422bc61b54a676234d17fc",
      title: "asdf",
      author: "Robert C. Martin",
      __v: 0
    } 

    await api.post('/api/blogs')
    .send(blog)
    .expect(400)


    const blog2 =  {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    } 

    await api.post('/api/blogs')
    .send(blog2)
    .expect(400)

  })