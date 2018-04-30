exports = module.exports = function(Schema) {
    // Duplicate the ID field.
    Schema.virtual('id').get(function(){
        return this._id.toHexString();
    });
    
    // Ensure virtual fields are serialised.
    Schema.set('toJSON', {
        virtuals: true
    });
}