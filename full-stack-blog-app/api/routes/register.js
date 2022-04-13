const express = require('express');
const routerRegister = express.Router();
const User = require("../data/UserSchema")

/* GET users listing. */
routerRegister.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

routerRegister.post("/", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save(function(error, user) {
    if (error) console.log(error)
    console.log("Save User", user)
  })

  User.find(function (err, users) {
    if (err) return console.error(err);
    console.log("All User", users);
  })
})

// app.get("/api/test", (req, res) => {
//   const test = [
//     {
//       id: 1,
//       firstName: "Rose",
//       lastName: "Change",
//     },
//     {
//       id: 2,
//       firstName: "Lisa",
//       lastName: "Leo",
//     },
//     {
//       id: 3,
//       firstName: "Ji",
//       lastName: "Swan",
//     },
//   ];
//   console.log("Get Test")
//   res.json(test);
// });

module.exports = routerRegister;
