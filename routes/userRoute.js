let express = require('express');
let router = express.Router();
let User = require('../models/userModel.js');
//get all users
router.get('/', function(req, res) {
    User.find({}, (err, docs) => {
        if (err) {
            res.send("Some error on server");
        } else {
            res.send(docs);
        }
    })
});

module.exports = router;
