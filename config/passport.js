const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy

const User = require("../models/User")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user)
  })
})

passport.use(new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.ROOT_URL}/auth/twitter/callback`
  },
  (token, tokenSecret, profile, done) => {
    User.findOne({ twitterId: profile.id }, (err, user) => {
      if (err) {
        done(err)
      }
      if (!user) {
        const newUser = new User({
          displayName: profile.displayName,
          twitterId: profile.id,
          image: profile._json.profile_image_url
        })
        newUser.save((error) => {
          done(error, newUser)
        })
      } else {
        done(null, user)
      }
    })
  }
))
