var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/users').User;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
var FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
var LocalStrategy = require('passport-local').Strategy;

var GoogleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.DOMAIN_URL + "/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      user.displayName = profile.displayName;
      user.save((err) => {
        if (err) console.log('User not saved');
      });
      return cb(err, user);
    });
  });

  var FacebookStrategy = new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.DOMAIN_URL + "/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      user.displayName = profile.displayName;
      user.save((err) => {
        if (err) console.log('User not saved');
      });
      return cb(err, user);
    });
  });

var LocalStrategy = new LocalStrategy(
  function(username, password, done) {
    User.findOrCreate({ username: 'demo' }, function (err, user) {
      user.displayName = 'demo';
      user.save((err) => {
        if (err) console.log('User not saved');
      });
      return done(null, user);
    });
  }
);

LocalStrategy.authenticate = function(req, options) {
  options = options || {};
  var username = 'demo';
  var password = 'demo';

  var self = this;
  
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, username, password, verified);
    } else {
      this._verify(username, password, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};

module.exports = {
    GoogleStrategy: GoogleStrategy,
    FacebookStrategy: FacebookStrategy,
    LocalStrategy
}
