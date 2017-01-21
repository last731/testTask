let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(unless("viber", bodyParser.json()));

app.use('/bots', require('./routes/botRoute.js')(app));
app.use('/users', require('./routes/userRoute.js'));
app.use('/history', require('./routes/historyRoute.js'));

app.listen(3000, function() {
    console.log('Server listening on port 3000!');
});

//to avoid use middleware with specific routes
function unless(path, middleware) {
    return function(req, res, next) {
        if (req.path.indexOf(path) !== -1) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};
