const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {type: Number, default: 0},
  })

  blogSchema.set('validateBeforeSave', true)
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      if (returnedObject.likes == undefined) {
        returnedObject.likes = 0
      }
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model("Blog", blogSchema)
  