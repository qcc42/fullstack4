const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
  id: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: String,
  user: {
    type: String,
    ref: 'User',
  }
} , {strictPopulate: false})

blogsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogsSchema)