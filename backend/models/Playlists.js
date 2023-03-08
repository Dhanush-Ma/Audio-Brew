const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const playlistsSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    tracks: {
      type: Array,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
     },
  },
  {
    timestamps: true,
  }
);

const Playlists = mongoose.model("Playlists", playlistsSchema);

module.exports = { Playlists };
