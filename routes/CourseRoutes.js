const requireLogin = require("../middlewares/requireLogin");
const Course = require("../models/Course");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const crypto = require("crypto");
var path = require("path");

var file = "";
var videoFile = [];
var imageUrl = "";
var videosUrl = '';

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
      callback(null, raw.toString("hex") + path.extname(file.originalname));
    });
  }
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "swikarbh",
  api_key: "718547922671517",
  api_secret: "nh2Ve-bPZEhFGkCuDw6UzRpneCY"
});

module.exports = app => {
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    file = req.file;
    res.send("Success");
  });

  app.post("/api/uploadVideos", upload.single("fileList"), async (req, res) => {
    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    var video = await cloudinary.uploader
      .upload(
        path,
        {
          resource_type: "video",
          public_id: `videos/${uniqueFilename}`,
          chunk_size: 6000000,
          eager: [
            { width: 300, height: 300, crop: "pad", audio_codec: "none" },
            {
              width: 160,
              height: 100,
              crop: "crop",
              gravity: "south",
              audio_codec: "none"
            }
          ],
          eager_async: true
          // eager_notification_url: "https://mysite.example.com/notify_endpoint"
        },
        function(err, result) {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
          // remove file from server
          const fs = require("fs");
          fs.unlinkSync(path);
          return result.path;
        }
      )
      .then(result => result)
      .catch(error => error);
      res.send(video)

    
  });

 



  app.post("/api/add_course/add", requireLogin, async (req, res) => {
    const path = file.path;
    const uniqueFilename = new Date().toISOString();

    // console.log("body", req.body);
    var image = await cloudinary.uploader
      .upload(
        path,
        {
          public_id: `thumbnail/${uniqueFilename}`,
          tags: `thumbnail`,
          format: "png",
          width: 800,
          height: 800
        },
        function(err, result) {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
          // remove file from server
          const fs = require("fs");
          fs.unlinkSync(path);
          return result.path;
        }
      )
      .then(result => result)
      .catch(error => error);

    const courseVideos = [];

    console.log("body", req.body);

    req.body.course.videos.forEach(video => {
      courseVideos.push({
        title: video.title,
        description: video.description,
        file: video.file,
        course: req.body.id
      });
    });

    console.log("coursevideos", courseVideos);

    var newCourse = await new Course({
      courseId: req.body.course.courseDetails.courseId,
      courseTitle: req.body.course.courseDetails.courseTitle,
      teacher: req.body.course.courseDetails.teacher,
      coursePrice: req.body.course.courseDetails.coursePrice,
      totalVideos: req.body.course.courseDetails.totalVideos,
      totalDuration: req.body.course.courseDetails.totalDuration,
      courseLevel: req.body.course.courseDetails.courseLevel,
      description: req.body.course.courseDetails.description,
      feature: [req.body.course.courseDetails.feature1, req.body.course.courseDetails.feature2],
      thumbnail: image.url,
      videos: courseVideos
    }).save(error => {
      if (error) {
        res.send(error)
      } else {
        res.send(newCourse)
        console.log("Course saved to DB!");
      }
    });

  });

  app.get("/api/fetch_course", async (req, res) => {
    Course.find({}, (err, allCourses) => {
      if (err) {
        console.log(err);
      } else {
        res.send(allCourses)
      }
    });
  });

  app.post("/api/course/:courseId", async (req,res) => {
    console.log('courseId', req.params.courseId)
    Course.findById(req.params.courseId).exec(
      (err, course) =>{
        if(err) console.log(err)
        else res.send(course)
       
      }
    )
    
  })

  app.post("/api/unlockcourse", async(req,res) =>{
    console.log('status', req.body)
    Course.findById(req.body.id).exec(
      (err, course) =>{
        if(err) console.log(err)
        else
        course.status = req.body.status
        course.save()
        res.send(course)
      }
    )
  })

    app.get("/api/:id/edit", async(req,res) =>{
    Course.findById(req.params.id, (err, foundCourse) =>{
      res.send(foundCourse)
    })
  })

  app.put("/api/:id", (req,res) =>{
    res.send(req.body)
    Course.findByIdAndUpdate(req.params.id, req.body.course, {new:true}, function(err, updatedCourse){
      if(err) res.redirect("/home")
      else{
        res.send({message:"Course Updated"})
        res.redirect("/home")
      }
    })
  })

  app.delete("/api/:id", function(req,res){
    console.log('delete', req.params.id)
    Course.findByIdAndRemove({_id: req.params.id}, function(err){
      if(err){
        console.log(error)
      }else{
        res.send({message: 'Course was successfully deleted!'})
      }
    })
  })

  app.post("/api/search/courses", function(req,res){
    var replace = req.body.value;
    var re = new RegExp(replace, "i");
    console.log('value', req.body)
    Course.find( {courseTitle: re }, function(err, course){
      if(err){
        res.send({message:'No Course Found!'})
      }else{
        res.send(course)
      }
    })
  })

};
