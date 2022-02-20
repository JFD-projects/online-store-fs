const express = require("express");
const Product = require("../models/Product");
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true });

router.patch("/:id", async (req, res) => {
  try {
    const {id} = req.params
    if (id) {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
      res.send(updatedProduct)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

router.post('/create', async (req, res) => {
    try {
      const newProduct = await Product.create({
        ...req.body,
      })

      res.status(201).send(newProduct)

    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

module.exports = router;
