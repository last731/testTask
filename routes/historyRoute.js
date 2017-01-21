let express = require('express');
let router = express.Router();
let History = require('../models/historyModel.js');
//get all messages betwen some bot and user
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

module.exports = router;
