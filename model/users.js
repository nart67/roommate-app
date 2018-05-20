var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    email: String,
    displayName: String, 
    groups: [{type: Schema.Types.ObjectId, ref: 'Group', index: true}]
});

require('./idVirtual')(userSchema);

userSchema.method('addGroup', function(group_id) {
  this.update({ $push: {groups: group_id}}, {}, () => {});
});

userSchema.method('removeGroup', function(group_id) {
  this.update({ $pull: {groups: group_id}}, {}, () => {});
});

userSchema.statics.findOrCreate = function findOrCreate(user, callback) {
    const self = this;
    self.findOne(user, (err, result) => {
      return result 
        ? callback(err, result)
        : self.create(user, (err, result) => {
          // TODO: need graceful error handling
          console.log(err);
          return callback(err, result);
        });
    });
  };

userSchema.statics.profile = function profile(user_id, callback) {
  this.findById(user_id).populate(
    { path :'groups', populate: [
      { path: 'lists' },
      { path: 'channels' }
    ]}
  )
  .exec(
    function(err, profile) {
      if (err) {
        callback(err);
        return;
      }
      
      if (!profile) {
          callback(new Error("not found"));
          return;
      }

      callback(null, profile);
    }
  );
}

userSchema.statics.inGroup = function inGroup(user_id, group_id, callback) {
  this.count({ _id: user_id, groups: group_id }, function(err, count) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, (count > 0));
    }
  );
}

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
    userSchema: userSchema
}