let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    who: 'string',
    text: 'string',
    time: Date
});

messageSchema.pre('save', function(next) {
    now = new Date();
    if (!this.time) {
        this.time = now;
    }
    next();
});

let historySchema = new mongoose.Schema({
    userToken: 'string',
    botToken: 'string',
    messages: [messageSchema]
});

module.exports = mongoose.model('History', historySchema);
