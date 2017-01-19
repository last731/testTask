let express = require('express');
let router = express.Router();
let History = require('../models/historyModel.js');

router.get('/:botToken/:userToken', function(req, res) {
    History.findOne({
        botToken: req.params.botToken,
        userToken: req.params.userToken
    }, (err, docs) => {
        if (err) {
            res.send("Some error on server");
        } else {
            res.send(docs);
        }
    })
});

router.put('/:botToken/:userToken', function(req, res) {
    History.findOne({
        botToken: req.params.botToken,
        userToken: req.params.userToken
    }, (err, history) => {
        history.messages.push(req.body);
        history.save((err) => {
            if (err) {
                res.send("Cant save, some error on server");
            } else {
                res.send("OK");
            }
        })
    })
});

router.put('/', function(req, res) {
    let history = new History();
    for (name in req.body) {
        history[name] = req.body[name];
    }
    history.save((err) => {
        if (err) {
            res.send("Cant save, some error on server");
        } else {
            res.send("OK");
        }
    })
});


module.exports = router;
