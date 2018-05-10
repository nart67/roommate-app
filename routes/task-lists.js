var express = require('express');
var router = express.Router({mergeParams: true});
var TaskList = require('../model/task-lists').TaskList;
var Group = require('../model/groups').Group;
var emit = require('../helper/socket').emit;

// Tasks subroute
router.use('/:listId/tasks', require('./tasks'));

// Update task list
router.put('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    var socket = req.body.socket;
    
    if (!req.body.taskList) {
      missing(res);
      return;
    }
    var newTaskList = JSON.parse(req.body.taskList);
    TaskList.updateList(id, user_id, newTaskList, function(err, newTaskList) {
      if (err) res.status(404).json({message: "Not found"});
      else {
        res.status(200).json({message: "Update successful"});
        emit(groupId, 'list', {type: 'ADD', list: newTaskList}, socket);
      }
    })
  });
  
  // Delete task list
  router.delete('/:id', function(req, res) {
    var user_id = req.user.id;
    var id = req.params.id;
    var socket = req.body.socket;
    var groupId = req.params.groupId;

    TaskList.deleteList(id, user_id, function(err, taskList) {
      if (err || !taskList) res.status(404).json({message: "Not found"});
      else {
        Group.findById(req.params.groupId, function(err, group) {
          group.removeList(taskList._id);
          res.status(200).json({message: "Delete successful"});
          emit(groupId, 'list', {type: 'DELETE', list: taskList}, socket);
        });
      }
    })
  });
  
  // Create task list
  router.post('/', function(req, res) {
    var newTaskList = JSON.parse(req.body.taskList);
    var socket = req.body.socket;
    var groupId = req.params.groupId;

    newTaskList = new TaskList({
      ...newTaskList,
      group: groupId
    });
    newTaskList.save(function(err) {
      if (err) res.status(409).json({message: "Add failed"});
      else {
        Group.findById(req.params.groupId, function(err, group) {
          group.addList(newTaskList._id);
          res.status(201).json({message: "Add successful", taskList: newTaskList});
          emit(groupId, 'list', {type: 'ADD', list: newTaskList}, socket);
        });
      }
    });
  });

  function missing(res) {
    res.status(400).json({message: "Missing information"});
  }

  module.exports = router;