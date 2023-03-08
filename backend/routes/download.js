const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");

router.get("/", async (req, res) => {
  const URL = req.query.URL;
  const TITLE = req.query.TITLE;
  
  res.header("Content-Disposition", `attachment; filename="${TITLE}.m4a`);

  ytdl(URL, {
    format: "mp3",
    filter: "audioonly",
  }).pipe(res);
});

module.exports = router;
