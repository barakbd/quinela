var mongoose = require('mongoose');
var Prediction = mongoose.model('Prediction');

module.exports = {
    findAllWithPoolId: function(req, res) {
        Prediction.find({
            _preditcionPool: req.body.poolId
        }).populate('_preditcionUser').populate('_preditcionPool').populate('predictions._match').exec(function(err, predictionsByPool) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    predictionsByPool: predictionsByPool
                });
            }
        });
    }, //END findAllWithPoolId

    findAllWithUserlId: function(req, res) {
        Prediction.find({
            _preditcionUser: req.body.userId
        }).populate('_preditcionUser').populate('_preditcionPool').populate('predictions._match').exec(function(err, predictionsByPool) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    predictionsByUser: predictionsByUser
                });
            }
        });
    }, //END findAllWithUserlId

    create: function(req, res) {
        //Instantiate new Pool object and poulate with initial data
        var newPrediction = new Prediction();
        newPrediction._predictionPool = req.body.poolId;
        newPrediction._predictionUser = req.body.userId;
        newPrediction.predictions = req.body.predictions;
        // Save to db
        newPrediction.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    newPredictionId: newPrediction._id
                });
            }
        });
    }, //END create


}; //END module.exports
