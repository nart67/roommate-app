var express = require('express');
var router = express.Router();
var User = require('../model/users').User;

router.use(require('connect-ensure-login').ensureLoggedIn());

/* GET users listing. */
router.get('/', function(req, res, next) {
  user_id = req.user.id;
  User.profile(user_id, function(err, profile) {
    if (err) res.status(404).json({message: "Not found"});
    else res.status(200).json({profile: profile});
  })
});

module.exports = router;
