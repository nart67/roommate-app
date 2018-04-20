var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: {type: String, required: true},
    task_list: {type: Schema.Types.ObjectId, ref: 'TaskList', required: true, index: true},
    description: String,
    date_added: {type: Date, default: Date.now},
    date_due: Date
});

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

        task.update(newTask, function(err) {
            if (err) callback(err);
            else callback(null);
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

var Task = mongoose.model('Task', taskSchema);

module.exports = {
    taskSchema: taskSchema,
    Task: Task
}