var express = require('express');
var router = express.Router();
var Offers = require('../models/OffersSchema');

/* GET home page. */
router.post('/', function (req, res, next) {
  // console.log('inside offer_ride', req.body);
  let body = req.body;
  let ret = {};

  Offers.find(function (err, doc) {
    // console.log("inside offer find");
    var newOffer = new Offers({
      id: doc.length + 1,
      name: body.name,
      car: body.car,
      seatsLeft: body.seatsLeft,
      pickUp: body.pickUp,
      destination: body.destination
    });
    Offers.create(newOffer, function (err, response) {
      Offers.find(function (err, availableOffers) {
        // console.log(availableOffers);
      });
      // console.log(response);
      if (response) {
        let ret = {
          message: "Offer added successfully",
          status: 200
        }
        res.send(ret);
      } else {
        err = new Error("Offer not added");
        next(err);
      }
    })
  });
});

module.exports = router;
