const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Playlists } = require("../models/Playlists");
const { Users } = require("../models/User");

router.get("/", async (req, res) => {
  const existingUser = await Users.findById(req.query.id);

  if (!existingUser) {
    return res.status(401).send("User not found!");
  }

  const userPlaylists = await Playlists.find({
    owner: req.query.id,
  });

  res.status(200).send(userPlaylists);
});

router.post("/", async (req, res) => {
  const existingUser = await Users.findById(req.body.id);

  if (!existingUser) {
    return res.status(401).send("User not found!");
  }

  const playlist = await new Playlists({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.playlistName,
    tracks: [],
    owner: req.body.id,
  });

  await playlist.save();

  res.status(200).send(playlist);
});

router.put("/", async (req, res) => {
  const existingUser = await Users.findById(req.body.id);

  if (!existingUser) {
    return res.status(401).send("User not found!");
  }

  const existingPlaylist = await Playlists.findById(req.body.playlistID);

  if (!existingPlaylist) {
    return res.status(401).send("Playlist not found!");
  }
  let playlist;
  if (req.body.flag === "add") {
    playlist = await Playlists.findByIdAndUpdate(req.body.playlistID, {
      $push: { tracks: req.body.trackID },
    });
    await playlist.save();
  }

  if (req.body.flag === "remove") {
    playlist = await Playlists.findByIdAndUpdate(req.body.playlistID, {
      $pull: { tracks: req.body.trackID },
    });
    await playlist.save();
  }
  const userPlaylists = await Playlists.find({
    owner: req.body.id,
  });
  res.status(200).send(userPlaylists);
});

router.delete("/", async (req, res) => {
  const existingUser = await Users.findById(req.body.id);

  if (!existingUser) {
    return res.status(401).send("User not found!");
  }

  const existingPlaylist = await Playlists.findById(req.body.playlistID);

  if (!existingPlaylist) {
    return res.status(401).send("Playlist not found!");
  }

  await Playlists.findByIdAndDelete(req.body.playlistID);

  const userPlaylists = await Playlists.find({
    owner: req.body.id,
  });
  res.status(200).send(userPlaylists);
});

module.exports = router;
