let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use('/bots', require('./routes/botRoute.js'));
app.use('/users', require('./routes/userRoute.js'));
app.use('/history', require('./routes/historyRoute.js'));

app.listen(3000, function() {
    console.log('Server listening on port 80!');
});
