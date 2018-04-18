var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    googleId: String,
    email: String,
    displayName: String
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