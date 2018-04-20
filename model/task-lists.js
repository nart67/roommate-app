var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskListSchema = new Schema({
    displayName: String,
    group: {type: Schema.Types.ObjectId, ref: 'Group'}
});

taskListSchema.index({ displayName: 1, group: 1 }, { unique: true });

taskListSchema.statics.updateList = function(id, user_id, newTaskList, callback) {
    this.findById(id).populate('group').exec(function(err, taskList) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!taskList) {
            callback(new Error("not found"));
            return;
        }

        if (!taskList.group.owner.equals(user_id)) {
            callback(new Error("unauthorized"));
            return;
        }

        if (newTaskList.displayName) taskList.displayName = newTaskList.displayName;

        taskList.save(function(err) {
            if (err) callback(err);
            else callback(null);
        });
    })
}

taskListSchema.statics.deleteList = function(id, user_id, callback) {
    this.findById(id).populate('group').exec(function(err, taskList) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!taskList) {
            callback(new Error("not found"));
            return;
        }

        if (!taskList.group.owner.equals(user_id)) {
            callback(new Error("unauthorized"));
            return;
        }

        taskList.remove(function(err, removed) {
            if (err) callback(err, null);
            else callback(null, removed);
        });
    })
}

var TaskList = mongoose.model('TaskList', taskListSchema);

module.exports = {
    taskListSchema: taskListSchema,
    TaskList: TaskList
}