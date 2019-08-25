const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
  }
});

const OrderDetailsSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
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
  m_pesa_code: {
    type: String
  },
  payment_method: {
    type: String,
    required: true
  },
  ordered_items: [ItemSchema],

  order_date: {
    type: Date,
    default: Date.now
  }
});

const Order_Details = mongoose.model("order_detail", OrderDetailsSchema);
module.exports = Order_Details;
