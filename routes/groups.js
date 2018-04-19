var express = require('express');
var router = express.Router();
var Group = require('../model/groups').Group;

router.use(require('connect-ensure-login').ensureLoggedIn());

// Update group
router.put('/:id', function(req, res) {
    user_id = req.user.id;
    id = req.params.id;
    
    if (!req.body.group) {
      missing(res);
      return;
    }
    var newGroup = JSON.parse(req.body.group);
    group.updateGroup(id, user_id, newGroup, function(err) {
      if (err) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Update successful"});
    })
  });
  
  // Delete group
  router.delete('/:id', function(req, res) {
    user_id = req.user.id;
    id = req.params.id;
    group.deleteGroup(id, user_id, function(err, group) {
      if (err || !group) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Delete successful"});
    })
  });
  
  // Create group
  router.post('/', function(req, res) {
    var newGroup = new Group({
      owner: req.user.id,
      displayName: req.body.displayName,
    });
    console.log(newGroup);
    newGroup.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else res.status(201).json({message: "Add successful", group: newGroup});
    })
  });

  function missing(res) {
    res.status(400).json({message: "Missing information"});
  }

  module.exports = router;
