const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseTitle: String,
  teacherName: String,
  coursePrice: Number,
  status: {type:String, default:'locked'},
  totalVideos: Number,
  totalDuration: Number,
  courseLevel: String,
  description: String,
  feature: Array,
  thumbnail: String,
  videos:Array,
});

module.exports = mongoose.model("courses", CourseSchema);
