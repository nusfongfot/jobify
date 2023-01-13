const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide firstname'],
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Please provide lastname'],
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide email'
    },
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true
  },
  location: {
    type: String,
    default: 'my city',
    trim: true
  }
})

module.exports = mongoose.model('User', UserSchema)
