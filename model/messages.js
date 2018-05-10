var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message: {type: String, required: true},
    channel: {type: Schema.Types.ObjectId, ref: 'Channel', required: true, index: true},
    timestamp: {type: Date, default: Date.now, index: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true}
});

require('./idVirtual')(messageSchema);

messageSchema.static('latestMessages', function(id, user_id, callback) {
    this.find({channel: id})
        .sort('-timestamp')
        .limit(100)
        .exec(function(err, messages) {
            if (err) {
                callback(err);
                return;
            }
        
            callback(null, messages);
    });
});