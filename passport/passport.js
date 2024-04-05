// passport-config.js
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth20').Strategy;
const User= require("../models/user");

const bcrypt = require("bcrypt");



passport.use(new OAuth2Strategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    clientID: "116588988341-ke636p9n38gj179jqfeqq2qecv9v5j6o.apps.googleusercontent.com",
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email']
},async (accessToken, refreshToken, profile, done) => {
    try {
    //   const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({
        where: {
            username: profile.username
          },
    })
      if (!user) {
        // Create new user if not found in database
        await User.create({
          username: profile.id,
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
  ));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
