var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storySchema = Schema ({
    _creator: {//It's IMPORTANT to match the type of _id to the type of ref (property is Number as personSchema)
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    title: String,
    fans: [{ 
        type: Number,
        ref: 'Person'
    }]
});

var Story = mongoose.model('Story', storySchema);

module.exports = function(config) {
    return new Story(config);
};
