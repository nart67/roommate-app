var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../model/users').User;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

var GoogleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      user.displayName = profile.displayName;
      user.save((err) => {
        if (err) console.log('User not saved');
      })
      return cb(err, user);
    });
  });

module.exports = {
    GoogleStrategy: GoogleStrategy
}