const mongoose = require('mongoose')
const {Schema} = mongoose

const videoSchema = new Schema({
  videoTitle: String,
  videoUrl: String,
  videoDescription: String,
  course: {
    type:mongoose.Types.ObjectId,
    ref: 'courses'
  }
})

module.exports = mongoose.model("videos", videoSchema)