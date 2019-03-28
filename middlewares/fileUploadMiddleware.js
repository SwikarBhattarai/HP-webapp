const axios = require('axios')
const cloudinary = require('cloudinary')

module.exports = function fileUploadMiddleware(req, res) {
  cloudinary.uploader.upload_stream((result) => {
    axios({
      url: '/api/upload', //API endpoint that needs file URL from CDN
      method: 'post',
      data: {
        url: result.secure_url,
        name: req.body.name,
        description: req.body.description,
      },
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  }).end(req.file.buffer);
}