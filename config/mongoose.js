const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("An Error occured while connection to DB");
});
db.once(`open`, () => {
  console.log("Connection to Database successful");
});

module.exports = db;
