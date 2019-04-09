const requireLogin = require("../middlewares/requireLogin");
const Course = require("../models/Course");
const Video = require("../models/Video");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const crypto = require("crypto");
var path = require("path");

var file = "";
var videoFile = [];
var imageUrl = "";
var videosUrl = [];

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
    videoFile.push(req.file.path);
    console.log("file", req.file);
    res.send("Success");
  });

  app.post("/api/add_course/add", requireLogin, async (req, res) => {
    const path = file.path;
    const videosPath = videoFile;
    const uniqueFilename = new Date().toISOString();

    //upload image
    // let imageUpload = new Promise(async(reslove, reject) =>{
    //   await cloudinary.uploader.upload(
    //     path,
    //     {
    //       public_id: `thumbnail/${uniqueFilename}`,
    //       tags: `thumbnail`,
    //       format: "png",
    //       crop: "fill",
    //       width: 300,
    //       height: 300
    //     },
    //     ((error, result) =>{
    //       if(error) reject (error)
    //       else
    //     })

    //   )
    // })
    var videos = [
      {
        videoTitle: req.body.course.videoTitle,
        videoDescription: req.body.course.videoDescription
      }
    ];

    function combineKeyData(data) {
      var output = {},
        item;
      for (var i = 0; i < data.length; i++) {
        item = data[i];
        for (var prop in item) {
          if (item.hasOwnProperty(prop)) {
            if (!(prop in output)) {
              output[prop] = [];
            }
            output[prop].push(item[prop]);
          }
        }
      }
      return output;
    }

    var result = combineKeyData(videos);
    console.log('result', result)

    console.log("videosssss", videos);

    // req.body.course.forEach(function(item){
    //   var existing = output.filter(function(v,i){
    //     return v.videoTitle = item.videoTitle
    //   })
    //   if (existing.length) {
    //     var existingIndex = output.indexOf(existing[0]);
    //     output[existingIndex].value = output[existingIndex].value.concat(item.value);
    //   } else {
    //     if (typeof item.value == 'string')
    //       item.value = [item.value];
    //     videos.push(item);
    //   }

    // })

    var image = await cloudinary.uploader
      .upload(
        path,
        {
          public_id: `thumbnail/${uniqueFilename}`,
          tags: `thumbnail`,
          format: "png",
          width: 800,
          height: 600
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

    console.log("image", image);

    let uploadVideos = () => {
      // res_promises will be an array of promises
      let res_promises = videoFile.map(
        file =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              file,
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
              function(error, result) {
                if (error) reject(error);
                else resolve(result);
              }
            );
          })
      );
      // Promise.all will fire when all promises are resolved
      Promise.all(res_promises)
        .then(result => {
          new Course({
            courseTitle: req.body.course.courseTitle,
            teacherName: req.body.course.teacherName,
            coursePrice: req.body.course.coursePrice,
            totalVideos: req.body.course.totalVideos,
            totalDuration: req.body.course.totalDuration,
            courseLevel: req.body.course.courseLevel,
            description: req.body.course.description,
            feature: [req.body.course.feature1, req.body.course.feature2],
            thumbnail: image.url,
            videos: [
              {
                title: req.body.course.videoTitle,
                description: req.body.course.videoDescription,
                url: result
              }
            ]
          }).save(error => {
            if (error) {
              console.log(error);
            } else {
              console.log("Course saved to DB!");
            }
          });
        })
        .catch(error => error);
    };

    uploadVideos()
      .then(result => res.send(result))
      .catch(error => console.log(error));
  });

  app.get("/api/fetch_course", async (req, res) => {
    Course.find({}, (err, allCourses) => {
      if (err) {
        console.log(err);
      } else {
        res.send(allCourses);
        console.log("allcourse", allCourses);
      }
    });
  });
};
