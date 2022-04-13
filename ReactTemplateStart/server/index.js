const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const auth = require("./middleware/auth")

const app = express();
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    firstname: req.user.firstname,
    role: req.user.role
  })
})
app.post("api/user/register", async (req, res) => {
  const user = new User(req.body);

  try {
    let user = await user.save();
    return res.json({
      sucess: true,
      user: user,
    });
  } catch (error) {
    res.status().json({
      suscess: false,
      error: err,
    });
  }
});

app.post("api/user/login", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });

    user.comparePassword(req.body.password, (err, isMath) => {
      if (!isMath) {
        return res.json({ loginSuccess: false, message: "Auth failed" });
      }
    });

    res.json({
      loginSuccess: true,
    });
  } catch (error) {
    return res.json({
      loginSuccess: false,
      message: "Auth failed, plase try again",
    });
  }

  app.get("/api/user/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
      if (err) return res.json({error: err, sucess: false})
      return res.status(200).send({
        sucess: true
      })
    })
  })

  user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);
    res.cookie("x_auth", user.token).status(200).json({
      loginSuccess: true,
    });
  });
});

app.listen(3000, () => {
  console.log("====================================");
  console.log("Listening on port 3000");
  console.log("====================================");
});

mongoose.connection.on("open", () => {
  console.log("DB Connected!");
});
mongoose.connection.on("error", (e) => console.log(e));
