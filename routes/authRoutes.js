const passport = require("passport");
var User = require("../models/User");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/home");

      if (req.user) {
        if (req.user.googleId === "113619158447403380554") {
          console.log("Admin");
          req.user.isAdmin = true;
          req.user.save();
        }
      }
    }
  );

  app.post("/api/addTeacher", async (req, res) => {
    console.log("teacher", req.body);
    res.send(req.body);
    var newUser = await new User({
      isTeacher: true,
      name: req.body.teacher.name,
      teacherEmail: req.body.teacher.email,
      password: req.body.teacher.password
    }).save(error => {
      if (error) console.log(error);
      else {
        res.send(newUser);
      }
    });
  });

  app.post(
    "/api/auth",
    passport.authenticate('local'),
    async (req, res) => {
      console.log('api', req.user)
      if(req.user){
        res.send(req.user);
      }else{
        res.redirect('/')
      }
      
    }
  );

  app.get("/api/fetchTeachers", async (req, res) => {
    User.find({ isTeacher: true }, "name email", function(err, teacher) {
      if (err) return handleError(err);
      else {
        res.send(teacher);
      }
    });
  });

  app.get("/api/logout", (req, res) => {
   
    req.logout();
    req.session=null;
    res.redirect("/")
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });


  app.post(`/api/current_user/update`, async (req, res) => {
    req.user.credits = req.body.amount;
    const user = await req.user.save();
    res.send(user);
  });
};
