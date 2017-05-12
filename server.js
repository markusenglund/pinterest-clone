const path = require("path")
const express = require("express")
const favicon = require("serve-favicon")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")
require("dotenv").config()

require("./config/passport")
const authRoute = require("./routes/auth")
const apiRoute = require("./routes/api")

const port = process.env.PORT || "3000"
const app = express()

mongoose.connect(process.env.DB_URL)

app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, "public")))

app.use("/auth", authRoute)
app.use("/api", apiRoute)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
