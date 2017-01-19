let mongoose = require('mongoose');
let botSchema = new mongoose.Schema({
    token: 'string',
    name: 'string'
});

module.exports = mongoose.model('Bot', botSchema);
