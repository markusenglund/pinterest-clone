const mongoose = require("mongoose")

const { Schema } = mongoose

const schema = new Schema({
  link: String,
  uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  likedBy: [String],
  description: String,
  dateAdded: Date
})

module.exports = mongoose.model("Picture", schema)
