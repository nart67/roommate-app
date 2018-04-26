var express = require('express');
var router = express.Router();
var Group = require('../model/groups').Group;
var User = require('../model/users').User;

router.use(require('connect-ensure-login').ensureLoggedIn());

// Task list subroute
router.use('/:groupId/lists', require('./task-lists'));

// Update group
router.put('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    
    if (!req.body.group) {
      missing(res);
      return;
    }
    var newGroup = JSON.parse(req.body.group);
    Group.updateGroup(id, user_id, newGroup, function(err) {
      if (err) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Update successful"});
    })
  });
  
  // Delete group
  router.delete('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    Group.deleteGroup(id, user_id, function(err, group) {
      if (err || !group) res.status(404).json({message: "Not found"});
      else {
        User.findById(req.user.id, function(err, user) {
          user.removeGroup(newGroup._id);
          res.status(200).json({message: "Delete successful"});
        });
      }
    })
  });
  
  // Create group
  router.post('/', function(req, res) {
    var newGroup = new Group({
      owner: req.user.id,
      displayName: req.body.displayName,
    });
    newGroup.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else {
        User.findById(req.user.id, function(err, user) {
          user.addGroup(newGroup._id);
          res.status(201).json({message: "Add successful", group: newGroup});
        });
      }
    });
  });

  function missing(res) {
    res.status(400).json({message: "Missing information"});
  }

  module.exports = router;
