var express = require('express');
var router = express.Router({mergeParams: true});
var Invite = require('../model/invites').Invite;
  
  // Send invite
  router.post('/', function(req, res) {
    var newInvite = JSON.parse(req.body.invite);
    var socket = req.body.socket;
    var groupId = req.params.groupId;
    var userId = req.user.id;

    // TODO: Check if user is admin of group
    newInvite = new Invite({
      ...newInvite,
      group: groupId,
      sender: userId
    });
    newInvite.save(function(err) {
      if (err) res.status(409).json({message: "Invite failed"});
      else {
          res.status(201).json({message: "Invite sent", invite: newInvite});
      }
    });
  });

  module.exports = router;
