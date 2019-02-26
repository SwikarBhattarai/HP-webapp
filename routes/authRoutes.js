const passport = require('passport')
var User = require("../models/User")
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google',{
      scope: ['profile', 'email'],
    }))
    
    app.get('/auth/google/callback', passport.authenticate('google'),
       (req, res) =>{
        res.redirect('/home')
      
        if(req.user){
          if(req.user.googleId === "113619158447403380554"){
            console.log("Admin")
            req.user.isAdmin = true
            req.user.save()
          
          }
        }
     
    })

    app.get('/api/logout', (req,res) => {
      req.logout()
      res.redirect('/')
    })

    app.get('/api/current_user', (req,res) =>{
     res.send(req.user)

    })

    app.post('/signup', (req,res) =>{
      var newUser = new User({name: req.body.name});
      User.register(newUser, req.body.password, (err,user) =>{
        if(err){
          console.log(err)
          res.redirect('/signup')
        }
        passport.authenticate('local')(req,res, function(){
          res.redirect("/home")
        })
      })
    })

    app.post('/login', passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/login'}), function(req,res){
      
    })
}


