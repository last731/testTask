let mongoose = require('mongoose');
const MongooseMap = require('mongoose-map')(mongoose);

let botSchema = new mongoose.Schema({
    token: 'string',
    name: 'string'
});

module.exports = mongoose.model('Bot', botSchema);
