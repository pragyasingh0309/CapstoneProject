var express = require('express');
var router = express.Router();
var Offers = require('../models/OffersSchema');
var Rides = require('../models/RidesSchema');

/* GET home page. */
router.post('/', function (req, res, next) {
  // console.log('inside book_ride', req.body);
  let body = req.body;
  // let ret = {};
  Offers.findOne({ id: body.id }, function (err, offer) {
    console.log(offer)
    if (offer.seatsLeft > 0) {
      Rides.find(function (err, doc) {
        var rideDetails = {
          rideId: doc.length + 1001,
          riderName: body.name,
          rideeName: body.ridee,
          pickUp: body.pickUp,
          destination: body.destination,
          status: 'booked',
        }
        Rides.create(rideDetails, function (err, response) {
          if (response) {
            Offers.updateOne({ id: body.id }, { $inc: { seatsLeft: -1 } }, function (err, updateOffer) {
              if (updateOffer) {
                res.send({
                  id: doc.length + 1001,
                  seatsLeft: body.seatsLeft - 1,
                  message: "Ride booked. Id is ",
                  status: 200
                })
              }
              else {
                err = new Error("Ride could not Booked");
                next(err);
              }
            });
          }else {
            err = new Error("Ride could not Booked");
            next(err);
          }
        });
      });
    }else {
      err = new Error("No seats available");
      next(err);
    }
  })
});

module.exports = router;
