var express = require('express');
var router = express.Router({mergeParams: true});
var Invite = require('../model/invites').Invite;

  // Use invite
  router.post('/:inviteId', function(req, res) {
    const { inviteId } = req.params;
    var socket = req.body.socket;
    var userId = req.user.id;

    Invite.useInvite(inviteId, userId, function(err) {
      if (err) res.status(403).json({message: "Invalid request"});
      else {
          res.status(200).json({message: "Joined group"});
      }
    });
  });

  /* GET invites listing. */
  router.get('/', function(req, res) {
    userId = req.user.id;
    Invite.find({recipient: userId})
    .populate({ path: 'group', select: 'displayName' })
    .populate({ path: 'sender', select: 'displayName'})
    .exec(function(err, invites) {
        if (err) res.status(404).json({message: "Not found"});
        else res.status(200).json({invites});
    });
  });

  module.exports = router;