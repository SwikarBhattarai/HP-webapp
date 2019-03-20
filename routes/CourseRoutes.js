const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post(`/api/add_course/add`, requireLogin, async (req,res) =>{
 
    console.log('backend', req.body.course)
  })
}