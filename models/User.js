const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  displayName: String,
  twitterId: String,
  image: String
})

module.exports = mongoose.model("User", schema)
