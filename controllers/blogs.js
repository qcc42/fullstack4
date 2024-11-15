const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

  })
  
  blogsRouter.post('/', async (request, response) => {
    if(request.body.hasOwnProperty('_id') && request.body.hasOwnProperty('title')){
      const blog = await new Blog(request.body).save()
      response.status(200).json(blog)
    }
    else {
      response.status(400).end()
    }
  })

  module.exports = blogsRouter