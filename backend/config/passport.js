const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const {GOOGLE_CALLBACK_URL, FACEBOOK_CALLBACK_URL} = require('../constants/url.passport');

const configurePassport = () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ googleId: profile.id });
  
            if (user) {
              return done(null, user);
            } else {
              user = new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
              });
              await user.save();
              return done(null, user);
            }
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );

    // Configuración de Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            user = new User({
              facebookId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            });
            await user.save();
            return done(null, user);
          }
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    });
  };
  
  module.exports = configurePassport;
