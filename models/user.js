const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  id: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  name: String,
  passwordHash:{
  type: String,
  required: true},
  blogs: [
    {
      type: String,
      ref: 'Blog',
    }
  ]},
  {strictPopulate: false},
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User