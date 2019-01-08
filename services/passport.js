const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
          done(null, user)
  })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleclientID,
    clientSecret: keys.googleclientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
}, 
async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({googleId: profile.id})
    if(existingUser){
      //we already have a record with given profile ID
      return done(null, existingUser)
    }
    //we don't have a user record with this ID
    const user = await new User({googleId: profile.id}).save()
    done(null, user)
  }
))
