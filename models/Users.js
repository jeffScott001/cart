const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  shoeId: {
    type: String
  },
  shoeName: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  url_main: {
    type: String
  },
  price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const FavoriteItemsSchema = new Schema({
  shoeId: {
    type: String
  },
  shoeName: {
    type: String
  },
  url_main: {
    type: String
  },
  price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  sur_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  cart_items: [CartSchema],
  favorite_items: [FavoriteItemsSchema],
  registered_date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
