const mongoose = require("mongoose");
const { Schema } = mongoose;
const Course = require("../models/Course");

const userSchema = new Schema({
  googleId: String,
  isAdmin: { type: Boolean, default: false },
  isTeacher: { type: Boolean, default: false },
  email: Array,
  name: Object,
  photo: Array,
  password: String,
  credits: { type: Number, default: 0 },
  teacherEmail:String,
  courses: [
    { course: { type: Schema.Types.ObjectId, ref: "courses" }, status: String }
  ]
});

module.exports = mongoose.model("users", userSchema);
