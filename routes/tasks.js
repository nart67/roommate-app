var express = require('express');
var router = express.Router({mergeParams: true});
var Task = require('../model/tasks').Task;

// Update task
router.put('/:id', function(req, res) {
    user_id = req.user.id;
    id = req.params.id;
    
    if (!req.body.task) {
      missing(res);
      return;
    }
    var newTask = JSON.parse(req.body.task);
    Task.updateTask(id, user_id, newTask, function(err) {
      if (err) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Update successful"});
    })
});

// Delete task
router.delete('/:id', function(req, res) {
    user_id = req.user.id;
    id = req.params.id;
    Task.deleteTask(id, user_id, function(err, task) {
      if (err || !task) res.status(404).json({message: "Not found"});
      else res.status(200).json({message: "Delete successful"});
    })
});
  
// Create task
router.post('/', function(req, res) {
    var newTask = JSON.parse(req.body.task);
    newTask.task_list = req.params.listId;
    newTask = new Task(newTask);
    newTask.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else res.status(201).json({message: "Add successful", task: newTask});
    });
});

function missing(res) {
    res.status(400).json({message: "Missing information"});
}

module.exports = router;