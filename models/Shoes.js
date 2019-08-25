const mongoose = require("mongoose");

//Schema
const Schema = mongoose.Schema;

//create schema
const shoeSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  shoeName: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  url_main: {
    type: String,
    required: true
  },
  url_2: {
    type: String
  },
  url_3: {
    type: String
  },
  url_3: {
    type: String
  },
  url_4: {
    type: String
  },
  shoeType: {
    type: String,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  category: {
    type: String
  },
  searchWords: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Shoes_list = mongoose.model("shoes_list", shoeSchema);
module.exports = Shoes_list;
