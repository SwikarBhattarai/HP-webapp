const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const LocalStrategy = require('passport-local')
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
  console.log('profile', profile)
  const existingUser = await User.findOne({googleId: profile.id})

    if(existingUser){
      //we already have a record with given profile ID
      return done(null, existingUser)
    }
    //we don't have a user record with this ID
    const user = await new User({googleId: profile.id, email:profile.emails, name:profile.name, photo:profile.photos}).save()
    console.log('new user', user)
    done(null, user)
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'

},(username, password, done) =>{
  User.findOne({ teacherEmail: username, password: password }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    console.log('user', user)
    return done(null, user);
  });
}
));
