const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
  googleId: String,
  isAdmin: {type:Boolean, default:false},
  name: String,
  password: String,
  credits: {type:Number, default:0}
})

mongoose.model('users', userSchema)