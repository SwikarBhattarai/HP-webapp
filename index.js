const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')
require("dotenv").config();

const app = express()

mongoose.connect(keys.mongoURI)

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({"extended": true}))
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]

  })
)

app.use(passport.initialize())
app.use(passport.session())


require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/courseRoutes')(app)


const PORT = process.env.PORT || 5000 
app.listen(PORT)