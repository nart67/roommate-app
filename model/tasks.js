var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: {type: String, required: true},
    task_list: {type: Schema.Types.ObjectId, ref: 'TaskList', required: true, index: true},
    completed: {type: Boolean, default: false, index: true},
    description: String,
    date_added: {type: Date, default: Date.now, index: true},
    date_due: {type: Date, index: true}
});

require('./idVirtual')(taskSchema);

taskSchema.statics.updateTask = function(id, user_id, newTask, callback) {
    this.findById(id, function(err, task) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!task) {
            callback(new Error("not found"));
            return;
        }
        Object.assign(task, newTask);

        task.save(function(err) {
            if (err) callback(err);
            else callback(null, task);
        });
    });
}

taskSchema.statics.deleteTask = function(id, user_id, callback) {
    this.findById(id, function(err, task) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!task) {
            callback(new Error("not found"));
            return;
        }

        task.remove(function(err, removed) {
            if (err) callback(err, null);
            else callback(null, removed);
        });
    });
}

taskSchema.statics.findByListId = function(id, user_id, callback) {
    this.find({ task_list: id }, function(err, tasks) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!tasks) {
            callback(new Error("not found"));
            return;
        }

        callback(null, tasks);
    });
}

var Task = mongoose.model('Task', taskSchema);

module.exports = {
    taskSchema: taskSchema,
    Task: Task
}