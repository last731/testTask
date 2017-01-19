let express = require('express');
let router = express.Router();
let Bot = require('../models/botModel.js');

router.get('/', function(req, res) {
    Bot.find({}, (err, docs) => {
        if (err) {
            res.send("Some error on server");
        } else {
            res.send(docs);
        }
    })
});

router.get('/:botToken', function(req, res) {
    Bot.findOne({
        token: req.params.botToken
    }, (err, docs) => {
        if (err) {
            res.send("Some error on server");
        } else {
            res.send(docs);
        }
    })
});

router.put('/:botToken', function(req, res) {
    Bot.findOne({
        token: req.params.botToken
    }, (err, bot) => {

        for (name in req.body) {
            bot[name] = req.body[name];
        }
        bot.save((err) => {
            if (err) {
                res.send("Cant save, some error on server");
            } else {
                res.send("OK");
            }
        })
    })
});

router.put('/', function(req, res) {
    let bot = new Bot();
    for (name in req.body) {
        bot[name] = req.body[name];
    }
    bot.save((err) => {
        if (err) {
            res.send("Cant save, some error on server");
        } else {
            res.send("OK");
        }
    })
});

module.exports = router;
