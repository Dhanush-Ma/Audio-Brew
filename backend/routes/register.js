const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Users } = require("../models/User");
const { LikedSongs } = require("../models/LikedSongs");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const existingUser = await Users.findOne({ email: req.body.email });

  if (existingUser) return res.status(409).send("User is already registered!");

  console.log(req.body);
  const id = new mongoose.Types.ObjectId();
  const user = await new Users({
    _id: id,
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  user.password = hashed;
  await user.save();

  const likedSongsPlaylist = await new LikedSongs({
    _id: new mongoose.Types.ObjectId(),
    tracks: [],
    owner: id,
  });

  await likedSongsPlaylist.save();

  // SET JWT TOKEN
  const token = user.generateJWT();
  res.status(200).header("x-auth-token", token).send(token);
});

module.exports = router;
