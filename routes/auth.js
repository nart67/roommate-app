var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/demo',
  passport.authenticate('local', 
  { successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;