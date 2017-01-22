const ViberBot = require('viber-bot').Bot;
let Bot = require('../models/botModel.js');
let User = require('../models/userModel.js');
let History = require('../models/historyModel.js');
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;

module.exports = function(authToken, botName, router) {
    let bot = new ViberBot({
        authToken: authToken,
        name: botName,
        avatar: "http://viber.com/avatar.jpg"
    });


    bot.onConversationStarted((userProfile, onFinish) => {
        checkUser(userProfile, bot.authToken);
        onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`))
    });

    bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
        checkUser(response.userProfile, bot.authToken);
        History.findOne({
            botToken: bot.authToken,
            userToken: response.userProfile.id
        }, (err, history) => {
            let temp = {};

            temp["timestamp"] = message["timestamp"];
            temp["text"] = message["text"];
            temp["from"] = response.userProfile.name;

            if (history) {
                history.messages.push(temp);
            } else {
                history = new History({
                    botToken: bot.authToken,
                    userToken: response.userProfile.id
                })
                history.messages.push(temp);
            }
            history.save((err) => {
                if (err) {

                } else {

                }
            })
        })
    });

    bot.on(BotEvents.MESSAGE_SENT, (message, userProfile) => {
        History.findOne({
            botToken: bot.authToken,
            userToken: userProfile.id
        }, (err, history) => {
            let temp = {};

            temp["timestamp"] = message["timestamp"];
            temp["text"] = message["text"];
            temp["from"] = bot.name;
            if (history) {
                history.messages.push(temp);
            } else {
                history = new History({
                    botToken: bot.authToken,
                    userToken: response.userProfile.id
                })
                history.messages.push(temp);
            }
            history.save((err) => {
                if (err) {

                } else {

                }
            })
        })
    });

    bot.say = function(userId, message) {
        User.findOne({
            token: userId
        }, (err, user) => {
            if (err) {

            } else {
                bot.sendMessage(user.userProfile, new TextMessage(message));
            }
        })
    }



    let now = new Date().getTime();

    bot.setWebhook(process.env.link + "/bots/viber/" + now);
    router.use("/viber/" + now, bot.middleware());
    return bot;
}

function checkUser(userProfile, botToken) {
    User.findOne({
        token: userProfile.id
    }, (err, user) => {
        if (err) {

        } else {
            if (!user) {
                let user = new User({
                    token: userProfile.id,
                    linkedBotToken: botToken,
                    userProfile: userProfile
                })
                user.save((err) => {
                    if (err) console.log(err);
                })
            }
        }
    })
}
