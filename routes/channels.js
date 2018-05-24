var express = require('express');
var router = express.Router({mergeParams: true});
var Channel = require('../model/channels').Channel;
var Group = require('../model/groups').Group;
var emit = require('../helper/socket').emit;

router.use(function(req, res, next) {
  if (!req.user) require('connect-ensure-login').ensureLoggedIn();
  else next()
});

// Messages subroute
router.use('/:channelId/messages', require('./messages'));

// Update channel
router.put('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    var socket = req.body.socket;
    
    if (!req.body.channel) {
      missing(res);
      return;
    }
    var newChannel = JSON.parse(req.body.channel);
    Channel.updateList(id, user_id, newChannel, function(err, newChannel) {
      if (err) res.status(404).json({message: "Not found"});
      else {
        res.status(200).json({message: "Update successful"});
        emit(groupId, 'channel', {type: 'UPDATE', channel: newChannel}, socket);
      }
    })
  });
  
  // Delete channel
  router.delete('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    var socket = req.body.socket;
    var groupId = req.params.groupId;

    Channel.deleteList(id, user_id, function(err, channel) {
      if (err || !channel) res.status(404).json({message: "Not found"});
      else {
        Group.findById(req.params.groupId, function(err, group) {
          group.removeChannel(channel._id);
          res.status(200).json({message: "Delete successful"});
          emit(groupId, 'channel', {type: 'DELETE', channel: channel}, socket);
        });
      }
    })
  });
  
  // Create channel
  router.post('/', function(req, res) {
    var newChannel = JSON.parse(req.body.channel);
    var socket = req.body.socket;
    var groupId = req.params.groupId;
    if (!groupId) return res.status(400).json({message: "Missing group"});

    newChannel = new Channel({
      ...newChannel,
      group: groupId
    });
    newChannel.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else {
        Group.findById(req.params.groupId, function(err, group) {
          group.addChannel(newChannel._id);
          res.status(201).json({message: "Add successful", channel: newChannel});
          emit(groupId, 'channel', {type: 'ADD', channel: newChannel}, socket);
        });
      }
    });
  });

  function missing(res) {
    res.status(400).json({message: "Missing information"});
  }

  module.exports = router;