var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    googleId: { type: String, unique: true },
    facebookId: { type: String, unique: true},
    email: String,
    displayName: String, 
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
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

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
    userSchema: userSchema
}