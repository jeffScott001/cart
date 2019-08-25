const express = require("express");
const Shoes_list = require("../../models/Shoes");

const router = express.Router();

//GET api/shoes
//display the shoes
//public
router.get("/", (req, res) => {
  Shoes_list.find()
    .then(details => {
      res.json(details);
    })
    .catch(err => {
      res.status(500).json({ msg: "Some server error" });
    });
});

//POST api/shoes
//display the shoe details
//public
router.get("/:id", (req, res) => {
  const _id = req.params.id;
  Shoes_list.findOne({ _id })
    .then(shoe => {
      res.json(shoe);
    })
    .catch(err => res.status(400).json({ msg: "No shoe with that id" }));
});

module.exports = router;
