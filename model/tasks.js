var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskListSchema = require('./task-lists').taskListSchema;

var TaskList = mongoose.model('Task List', taskListSchema);

var taskSchema = new Schema({
    title: {type: String, required: true},
    task_list: {type: Schema.Types.ObjectId, ref: 'Task List', required: true},
    description: String,
    date_added: {type: Date, default: Date.now},
    date_due: Date
});

var Task = mongoose.model('Task', taskSchema);

module.exports = {
    taskSchema: taskSchema,
    Task: Task
}