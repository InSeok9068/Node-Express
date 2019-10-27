const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const google = require("./../google/google.json");

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: google.web.client_id,
      clientSecret: google.web.client_secret,
      callbackURL: google.web.redirect_uris[0]
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        const user = profile;
        return done(null, user);
      });
    }
  )
);

/* GET home page. */
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  res.redirect("/");
});

module.exports = router;
