const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.patch("/:id", async (req, res) => {
  try {
    const {id} = req.params

    if (id) {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
      res.send(updatedUser)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }

});

router.get("/", async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка, попробуйте позже"
    });
  }
});

module.exports = router
