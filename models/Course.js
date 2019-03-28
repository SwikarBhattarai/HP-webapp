const mongoose = require('mongoose')
const {Schema} = mongoose

const CourseSchema = new Schema({
  courseTitle: String,
  teacherName: String,
  coursePrice: Number,
  totalVideos: Number,
  totalDuration: Number,
  courseLevel: Array,
  description:String,
  feature1:String,
  feature2:String,
  thumbnail:String,
})

module.exports = mongoose.model('courses', CourseSchema)