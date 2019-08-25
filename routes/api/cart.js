const express = require("express");
const User = require("../../models/Users");
const auth = require("../../middleware/auth");

const router = express.Router();

//GET api/cart
//display cart items
//private
router.get("/", auth, (req, res) => {
  User.findById(req.user.id).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    res.json(user.cart_items);
  });
});

//POST api/cart
//add to items to cart
//private
router.post("/", auth, (req, res) => {
  const items = req.body;
  User.findById(req.user.id)
    .then(user => {
      items.forEach(item => {
        const { color, size, shoeName, shoeId, url_main, price } = item;
        user.cart_items.push({
          color,
          size,
          shoeName,
          shoeId,
          url_main,
          price
        });
      });
      user
        .save()
        .then(user => {
          res.json(user.cart_items);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//Delete api/cart
//add to items to cart
//private
router.delete("/:id", auth, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      let item = user.cart_items.id(req.params.id);
      item.remove();
      user
        .save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
