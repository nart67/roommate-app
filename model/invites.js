var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inviteSchema = new Schema({
    group: {type: Schema.Types.ObjectId, ref: 'Group', required: true, index: true},
    recipient: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    message: String
});

var User = require('./users').User;

require('./idVirtual')(inviteSchema);

inviteSchema.static('useInvite', function(id, user_id, callback) {
    this.findById(id, async function(err, invite) {
        if (err) return callback(err);
        if (!invite || invite.recipient != user_id) 
            return callback(new Error('invalid invite'));
        
        let user;
        try {
            user = await User.findById(user_id);
        } catch (e) {
            return callback(new Error('error finding user'));
        }
        if (!user) return callback(new Error('user not found'));

        let addGroup = user.addGroup();
        let deleteInvite = invite.remove();
        // TODO: Potentially rewrite to use real promises instead of thenable queries
        Promise.all([addGroup, deleteInvite]).then(function(values) {
            if (!values[0] || values[0].nModified < 1) 
                return callback(new Error('already in group'));
            return callback();
        });
    });
});

var Invite = mongoose.model('Invite', inviteSchema);

module.exports = {
    inviteSchema,
    Invite
}