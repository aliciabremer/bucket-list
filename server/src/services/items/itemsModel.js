const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  originalUser: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("Item", itemSchema);
