let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    token: 'string',
    name: 'string',
    age: 'string',
    created: Date,
    linkedBotToken: 'string'
});

userSchema.pre('save', function(next) {
    now = new Date();
    if (!this.created) {
        this.token = now.getTime();
        this.created = now;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
