const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  name: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

mongoose.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, retObject) => {
    retObject.id = retObject._id.toString()
    delete retObject._id
    delete retObject.__v
    delete retObject.password
  }
})

module.exports = mongoose.model('User', userSchema)