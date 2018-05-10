var express = require('express');
var router = express.Router({mergeParams: true});
var Message = require('../model/messages').Message;

// Get last messages
router.get('/', function(req, res) {
  var channel_id = req.params.channelId;
  var user_id = req.user.id;
  Message.latestMessages(channel_id, user_id, function(err, messages) {
    if (err) res.status(404).json({message: "Not found"});
    else res.status(200).json({message: "Get successful", messages: messages});
  });
});

function missing(res) {
    res.status(400).json({message: "Missing information"});
}

module.exports = router;