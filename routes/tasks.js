var express = require('express');
var router = express.Router({mergeParams: true});
var Task = require('../model/tasks').Task;
var emit = require('../helper/socket').emit;

// Update task
router.put('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    var groupId = req.params.groupId;
    
    if (!req.body.task) {
      missing(res);
      return;
    }
    var newTask = JSON.parse(req.body.task);
    Task.updateTask(id, user_id, newTask, function(err, raw) {
      if (err) res.status(404).json({message: "Not found"});
      else {
        res.status(200).json({message: "Update successful", task: raw});
        emit(groupId, 'task', {type: 'UPDATE', task: raw});
      }
    })
});

// Delete task
router.delete('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    var groupId = req.params.groupId;

    Task.deleteTask(id, user_id, function(err, task) {
      if (err || !task) res.status(404).json({message: "Not found"});
      else {
        res.status(200).json({message: "Delete successful"});
        emit(groupId, 'task', {type: 'DELETE', task: task});
      }
    })
});
  
// Create task
router.post('/', function(req, res) {
    var newTask = JSON.parse(req.body.task);
    var groupId = req.params.groupId;
    newTask.task_list = req.params.listId;
    newTask = new Task(newTask);
    newTask.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else {
        res.status(201).json({message: "Add successful", task: newTask});
        emit(groupId, 'task', {type: 'ADD', task: newTask});
      }
    });
});

// Get tasks by list ID
router.get('/', function(req, res) {
  var list_id = req.params.listId;
  var user_id = req.user.id;
  Task.findByListId(list_id, user_id, function(err, tasks) {
    if (err) res.status(404).json({message: "Not found"});
    else res.status(200).json({message: "Get successful", tasks: tasks});
  });
});

function missing(res) {
    res.status(400).json({message: "Missing information"});
}

module.exports = router;