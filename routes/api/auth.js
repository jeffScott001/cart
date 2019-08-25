const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

//User model
const User = require("../../models/Users");

const router = express.Router();

//POST api/auth
// User Login
//public route

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "Email does not exist" });
    }

    //compare passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Wrong password" });
      }
      jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user._id,
              sur_name: user.sur_name,
              email: user.email,
              phone_number: user.phone_number,
              county: user.county,
              region: user.region,
              street: user.street,
              first_name: user.first_name,
              last_name: user.last_name
            }
          });
          res.redirect("/");
        }
      );
    });
  });
});
//@routes GET api/auth/user
//Get the user data
//access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
