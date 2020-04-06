var express = require('express');
var router = express.Router();
var Rides = require('../models/RidesSchema');
var Offers = require('../models/OffersSchema');

/* GET home page. */
router.post('/', function (req, res, next) {
  //console.log('inside cancel ride', req.body);
  var params = req.body;
  var ret = {};
  Rides.find(function (err, doc) {
    Rides.updateOne({ rideId: params.rideId }, { $set: { status: 'cancelled' } }, function (err, updatedRide) {
      if (updatedRide) {
        Offers.updateOne({ id: params.id }, { $inc: { seatsLeft: 1 } }, function (err, updatedOffer) {
          if (updatedOffer) {
            ret = {
              seatsLeft: params.seatsLeft + 1,
              message: "Ride cancelled successfully",
              status: 200
            }
            res.send(ret);
          }
          else {
            err = new Error("Ride not canceled");
            next(err);
          }
        })
      }
      else {
        err = new Error("Ride not canceled");
        next(err);
      }
    });
  })
});

module.exports = router;