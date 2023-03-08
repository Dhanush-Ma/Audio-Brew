const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { LikedSongs } = require("../models/LikedSongs");

const { Users } = require("../models/User");

router.get("/", async (req, res) => {
  const existingUser = await Users.findById(req.query.id);

  if (!existingUser) {
    return res.status(401).send("User not found!");
  }

  const userLikedSongs = await LikedSongs.findOne({
    owner: req.query.id,
  });

  res.status(200).send(userLikedSongs);
});

router.put("/", async (req, res) => {
  const existingUser = await Users.findById(req.body.id);

  if (!existingUser) {
    return res.status(401).send("User not found!");
  }

  let likedSongs;
  if (req.body.flag === "add") {
    likedSongs = await LikedSongs.findOneAndUpdate(
      { owner: req.body.id },
      {
        $push: { tracks: req.body.trackID },
      },
      {
        new: true,
      }
    );
  }

  if (req.body.flag === "remove") {
    likedSongs = await LikedSongs.findOneAndUpdate(
      {
        owner: req.body.id,
      },
      {
        $pull: { tracks: req.body.trackID },
      },
      {
        new: true,
      }
    );
  }
  const userLikedSongs = await LikedSongs.findOne({
    owner: req.body.id,
  });

  res.status(200).send(userLikedSongs);
});

module.exports = router;
