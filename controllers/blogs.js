const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

  })
  
  blogsRouter.post('/', async (request, response) => {
    if(request.body.hasOwnProperty('url') && request.body.hasOwnProperty('title')){
      const blog = await new Blog(request.body).save()
      response.status(200).json(blog)
    }
    else {
      response.status(400).end()
    }
  })

  blogsRouter.delete('/:id' , async (request, response) => {
    Blog.deleteOne({_id: new mongoose.Types.ObjectId(request.params.id)})
      response.status(200)
  })

  module.exports = blogsRouter