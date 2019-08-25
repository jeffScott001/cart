const express = require("express");
const auth = require("../../middleware/auth");

//models
const Order_details = require("../../models/Order");
const User = require("../../models/Users");

const router = express.Router();

//GET api/order
//display ordered items
//private
router.get("/", auth, (req, res) => {
  Order_details.find().then(details => {
    res.json(details);
  });
});

//POST api/order
//place an order
//private
router.post("/", auth, (req, res) => {
  const {
    county,
    email,
    phone_number,
    region,
    street,
    sur_name,
    user_id,
    m_pesa_code,
    payment_method,
    first_name,
    last_name,
    ordered_items
  } = req.body;

  const newOrderDetails = new Order_details({
    county,
    email,
    phone_number,
    region,
    street,
    sur_name,
    user_id,
    m_pesa_code,
    payment_method,
    first_name,
    last_name,
    ordered_items
  });
  newOrderDetails
    .save()
    .then(details => {
      res.json({ success: true });
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
        .then(item => res.json({ cleared: true }))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
