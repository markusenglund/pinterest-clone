const passport = require("passport")
const express = require("express")

const router = express.Router()

router.get("/twitter", passport.authenticate("twitter"))

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    const { id } = req.user
    res.cookie("user", id)
    res.redirect("/")
  }
)

module.exports = router
