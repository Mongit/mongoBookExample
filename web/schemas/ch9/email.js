var mongoose = require('mongoose');

var emailSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,// evita que se repite el email en la db
        required: true//no se guarda en la db si el form no tiene datos
    }
});

var Email = mongoose.model('Email', emailSchema);

module.exports = function(config) {
    return new Email(config);
};