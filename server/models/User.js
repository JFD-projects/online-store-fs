const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  password: String,
  cart: Array
}, {
  timestamps: true
})

module.exports = model('User', schema)
