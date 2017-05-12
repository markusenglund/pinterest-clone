const express = require("express")
const Picture = require("../models/Picture")

const router = express.Router()

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }
}

function getPictures(cb) {
  Picture
    .find({})
    .sort({ dateAdded: -1 })
    .populate("uploadedBy")
    .exec((err, docs) => {
      cb(err, docs)
    })
}

router.get("/pictures", (req, res) => {
  getPictures((err, docs) => res.send(docs))
})

router.post("/picture", isLoggedIn, (req, res) => {
  const { link, description } = req.body
  const picture = new Picture({
    link,
    description,
    uploadedBy: req.user.id,
    likedBy: [],
    dateAdded: Date.now()
  })
  picture.save(() => {
    getPictures((err, docs) => res.send(docs))
  })
})

router.delete("/picture", isLoggedIn, (req) => {
  Picture
    .findOneAndRemove({ uploadedBy: req.user.id, _id: req.query.id })
    .exec()
})

// Add or subtract a like depending on if the user already has liked the image
router.put("/like", isLoggedIn, (req) => {
  Picture.findById(req.body.pictureId, (err, pic) => {
    if (pic.likedBy.includes(req.user.id)) {
      pic.likedBy = pic.likedBy.filter(userId => userId !== req.user.id)
    } else {
      pic.likedBy.push(req.user.id)
    }
    pic.save()
  })
})

module.exports = router
