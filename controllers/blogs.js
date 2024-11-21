const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedBlog)
})



blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Blog({
    title: body.title,
    url: body.url === undefined ? false : body.url,
    user: user._id
  })

  const savedBlog = await note.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})
blogsRouter.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (user){
      if (user.blogs.includes(request.params.id)){
       const res = await Blog.findByIdAndDelete(new mongoose.Types.ObjectId(request.params.id))
        console.log(res)
      }
      else{
      response.status(404).end()
    }
  }
  else{
    response.status(404).end()
  }
    response.status(204).end()
})

module.exports = blogsRouter