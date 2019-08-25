const express = require("express");
const bcrypt = require("bcryptjs");

//User model
const User = require("../../models/Users");

// Declare express router
const router = express.Router();

router.post("/", (req, res) => {
  const {
    first_name,
    last_name,
    sur_name,
    email,
    phone_number,
    password,
    password2,
    county,
    region,
    street
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !sur_name ||
    !email ||
    !phone_number ||
    !county ||
    !region ||
    !street
  ) {
    return res.status(400).json({ msg: "Enter all fields" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be six characters and above" });
  }
  if (password !== password2) {
    return res.status(400).json({ msg: "Password don't match" });
  }

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email already exist" });
    }

    const newUser = new User({
      first_name,
      last_name,
      sur_name,
      email,
      phone_number,
      password,
      county,
      region,
      street
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json({ msg: "Account Successfully Created" });
          })
          .catch(err => res.status(500).json({ msg: "Registration failed" }));
      });
    });
  });
});

module.exports = router;
