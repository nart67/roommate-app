var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    googleId: { type: String, unique: true },
    facebookId: { type: String, unique: true},
    email: String,
    displayName: String, 
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
});

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
          return callback(err, result);
        });
    });
  };

userSchema.statics.profile = function profile(user_id, callback) {
  this.findById(user_id).populate(
    { path :'groups', populate: { path: 'lists' }}
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

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
    userSchema: userSchema
}