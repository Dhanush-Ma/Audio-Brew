const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Users } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const existingUser = await Users.findOne({ email: req.body.email });

  if (!existingUser) {
    return res.status(401).send("User not found! Try Signing In!");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );
  if (!validPassword) {
    return res.status(400).send("Password doesn't match our records!");
  }

  // SET JWT TOKEN
  const token = existingUser.generateJWT();
  res.status(200).header("x-auth-token", token).send(token);
});

module.exports = router;
