let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    token: 'string',
    created: Date,
    linkedBotToken: 'string',
    userProfile: Object
});

userSchema.pre('save', function(next) {
    now = new Date();
    if (!this.created) {
        this.created = now;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
