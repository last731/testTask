let mongoose = require('mongoose');

let historySchema = new mongoose.Schema({
    userToken: 'string',
    botToken: 'string',
    messages: []
});

module.exports = mongoose.model('History', historySchema);
