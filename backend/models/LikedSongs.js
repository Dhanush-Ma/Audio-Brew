const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const likedSongsSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  tracks: {
    type: Array,
  },
  owner: {
    type: mongoose.Types.ObjectId,
  },
});

const LikedSongs = mongoose.model("likedSongs", likedSongsSchema);

module.exports = { LikedSongs };
