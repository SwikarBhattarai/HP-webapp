const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
  googleId: String,
  isAdmin: {type:Boolean, default:false},
  email: Array,
  name:Object,
  photo:Array,
  password: String,
  credits: {type:Number, default:0}
})

module.exports = mongoose.model('users', userSchema)