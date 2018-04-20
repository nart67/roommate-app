var express = require('express');
var router = express.Router();
var TaskList = require('../model/task-lists').TaskList;

// Tasks subroute
router.use('/:listId/tasks', require('./tasks'));

// Update task list
router.put('/:id', function(req, res) {
    user_id = req.user.id;
    id = req.params.id;
    
    if (!req.body.taskList) {
      missing(res);
      return;
    }
    var newTaskList = JSON.parse(req.body.taskList);
    TaskList.updateList(id, user_id, newTaskList, function(err) {
      if (err) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Update successful"});
    })
  });
  
  // Delete task list
  router.delete('/:id', function(req, res) {
    user_id = req.user.id;
    id = req.params.id;
    TaskList.deleteList(id, user_id, function(err, taskList) {
      if (err || !taskList) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Delete successful"});
    })
  });
  
  // Create task list
  router.post('/', function(req, res) {
    var newTaskList = new TaskList({
      group: req.params.groupId,
      displayName: req.body.displayName,
    });
    newTaskList.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else res.status(201).json({message: "Add successful", taskList: newTaskList});
    });
  });

  function missing(res) {
    res.status(400).json({message: "Missing information"});
  }

  module.exports = router;