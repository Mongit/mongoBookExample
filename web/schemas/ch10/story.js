var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storySchema = Schema ({
    //It's IMPORTANT to match the type of _id to the type of ref (property is Number as personSchema)
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    title: String,
    fans: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }]
});

var Story = mongoose.model('Story', storySchema);

module.exports = function(config) {
    return new Story(config);
};
