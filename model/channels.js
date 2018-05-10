var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
    displayName: {type: String, required: true},
    group: {type: Schema.Types.ObjectId, ref: 'Group'}
});

require('./idVirtual')(channelSchema);

channelSchema.index({ displayName: 1, group: 1 }, { unique: true });

channelSchema.statics.updateChannel = function(id, user_id, newChannel, callback) {
    this.findById(id).populate('group').exec(function(err, channel) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!channel) {
            callback(new Error("not found"));
            return;
        }

        if (!channel.group.owner.equals(user_id)) {
            callback(new Error("unauthorized"));
            return;
        }

        if (newChannel.displayName) channel.displayName = newChannel.displayName;

        channel.save(function(err) {
            if (err) callback(err);
            else callback(null, channel);
        });
    })
}

channelSchema.statics.deleteChannel = function(id, user_id, callback) {
    this.findById(id).populate('group').exec(function(err, channel) {
        if (err) {
            callback(err);
            return;
        }
        
        if (!channel) {
            callback(new Error("not found"));
            return;
        }

        if (!channel.group.owner.equals(user_id)) {
            callback(new Error("unauthorized"));
            return;
        }

        channel.remove(function(err, removed) {
            if (err) callback(err, null);
            else callback(null, removed);
        });
    })
}

var Channel = mongoose.model('Channel', channelSchema);

module.exports = {
    channelSchema: channelSchema,
    Channel: Channel
}