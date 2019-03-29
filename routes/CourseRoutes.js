const requireLogin = require('../middlewares/requireLogin')
const Course = require('../models/Course')
const cloudinary = require('cloudinary')

const upload = require('../handlers/multer')

cloudinary.config({
  cloud_name: 'swikarbh',
  api_key: '718547922671517',
  api_secret: 'nh2Ve-bPZEhFGkCuDw6UzRpneCY',
});



module.exports = app => {
  app.post(`/api/add_course/add`,requireLogin, upload.single('thumbnail'), async (req,res) =>{
    var newCourse = await new Course(req.body.course).save()
    console.log('backend course', req.body.course)
    res.send(newCourse)
    console.log('coursee', req.body.course.thumbnail)
    const result = await cloudinary.v2.uploader.upload(req.body.course.thumbnail)
    res.send(result)
  })

  app.get('/api/fetch_course', async(req,res) =>{
    res.send(req.body.course)
  })
}