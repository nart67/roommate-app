var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    displayName: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    lists: [{type: Schema.Types.ObjectId, ref: 'TaskList'}],
    channels: [{type: Schema.Types.ObjectId, ref: 'Channel'}]
});

require('./idVirtual')(groupSchema);

groupSchema.method('addList', function(list_id) {
    this.update({ $push: {lists: list_id}}, {}, () => {});
});
  
groupSchema.method('removeList', function(list_id) {
    this.update({ $pull: {lists: list_id}}, {}, () => {});
});

groupSchema.method('addChannel', function(channel_id) {
    this.update({ $push: {channels: channel_id}}, {}, () => {});
});
  
groupSchema.method('removeChannel', function(channel_id) {
    this.update({ $pull: {channels: channel_id}}, {}, () => {});
});

groupSchema.statics.updateGroup = function(id, user_id, newGroup, callback) {
    this.findById(id, function(err, group) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!group) {
            callback(new Error("not found"));
            return;
        }

        if (!group.owner.equals(user_id)) {
            callback(new Error("unauthorized"));
            return;
        }

        if (newGroup.displayName) group.displayName = newGroup.displayName;

        group.save(function(err) {
            if (err) callback(err);
            else callback(null);
        });
    })
}

groupSchema.statics.deleteGroup = function(id, user_id, callback) {
    this.findById(id, function(err, group) {
        if (err) {
            callback(err);
            return;
        }

        if (!group) {
            callback(new Error("not found"));
            return;
        }
        
        if (!group.owner.equals(user_id)) {
            callback(new Error("unauthorized"));
            return;
        }

        group.remove(function(err, removed) {
            if (err) callback(err, null);
            else callback(null, removed);
        });
    })
}

var Group = mongoose.model('Group', groupSchema);

module.exports = {
    Group: Group,
    groupSchema: groupSchema
}