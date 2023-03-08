const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/register", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/me", require("./routes/home"));
app.use("/token", require("./routes/token"));
app.use("/refresh", require("./routes/refresh"));
app.use("/playlists", require("./routes/playlists"));
app.use("/likedSongs", require("./routes/liked"));
app.use("/download", require("./routes/download"));

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/AudioBrew", {
    family: 4,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
