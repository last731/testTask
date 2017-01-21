let express = require('express');
let router = express.Router();
let Bot = require('../models/botModel.js');
let viberBot = require("../libs/viberBot.js");
let viberBots = [];
//init bots from db
Bot.find({}, (err, docs) => {
        docs.forEach((bot) => {
            viberBots[bot.token] = viberBot(bot.token, bot.name, router);
        })
    })
    //get all bots
router.get('/', function(req, res) {
    Bot.find({}, (err, docs) => {
        if (err) {
            res.send("Some error on server");
        } else {
            res.send(docs);
        }
    })
});
//get specified bot
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
//send message from bot to user
router.put('/:botToken/:userToken', function(req, res) {
    viberBots[req.params.botToken].say(req.params.userToken, req.body.text);
    res.send("OK");
});
//edit some bot
router.put('/:botToken', function(req, res) {
    Bot.findOne({
        token: req.params.botToken
    }, (err, bot) => {
        if (err || !bot) return res.send("Cant save, some error on server");
        viberBots[bot.token] = viberBot(bot.token, bot.name, router);
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
//add new bot
router.post('/', function(req, res) {
    let bot = new Bot();

    viberBots[bot.token] = viberBot(bot.token, bot.name, router);
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

module.exports = function() {

    // "456eec8ecef031cd-5be985a50e59fb69-69568a4e941124a5"
    // "456f4bc237f5b91d-f890285bf0d0c28e-3ef105ad92ec0a9b"

    return router;
}
