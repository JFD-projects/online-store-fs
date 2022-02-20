const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
}, {
  timestamps: true
})

module.exports = model('Product', schema)
