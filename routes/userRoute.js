let express = require('express');
let router = express.Router();
let User = require('../models/userModel.js');

router.get('/', function(req, res) {
    User.find({}, (err, docs) => {
        if (err) {
            res.send("Some error on server");
        } else {
            res.send(docs);
        }
    })
});

router.put('/', function(req, res) {
    let user = new User();
    for (name in req.body) {
        user[name] = req.body[name];
    }
    user.save((err) => {
        if (err) {
            res.send("Cant save, some error on server");
        } else {
            res.send("OK");
        }
    })
});


module.exports = router;
