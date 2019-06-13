const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseId: Number,
  courseTitle: String,
  teacher: String,
  coursePrice: Number,
  totalVideos: Number,
  totalDuration: Number,
  courseLevel: String,
  description: String,
  feature: Array,
  thumbnail: String,
  videos:[
    {
     title:String,
     description:String,
     file:String,
    }
  ],
  addedTime: { type : Date, default: Date.now }
});

module.exports = mongoose.model("courses", CourseSchema);
