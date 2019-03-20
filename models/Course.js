const mongoose = require('mongoose')
const {Schema} = mongoose

const CourseSchema = new Schema({
  title: String,
  teacherName: string,
  totalVideos:Number,
  totalDuration: Number,
  price:Number,
  level:Array,
  feature1:String,
  feature2:String,
  feature3:String,
  feature4:String,
  feature5:String,
  description:String,
})

mongoose.model('users', CourseSchema)