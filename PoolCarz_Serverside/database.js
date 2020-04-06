var mongoose = require('mongoose');
var OffersList = require('./models/OffersSchema')
var RidesList = require('./models/RidesSchema');
var UsersList = require('./models/UsersSchema');

mongoose.connect("mongodb://localhost/Carpoolz", function () {
    console.log("db connected");
    mongoose.connection.db.dropDatabase();

    var rides = [{
        rideId: 1001,
        riderName: "Krishna",
        rideeName: "admin",
        pickUp: "MNG SEZ",
        destination: "Pumpwell",
        status: "cancelled",
    }];

    rides.forEach(function (ride) {
        new RidesList(ride).save();
    })

    var users = [{
        username: "krishna",
        password: "krishna"
    }, {
        username: "kalpana",
        password: "kalpana"
    }, {
        username: "admin",
        password: "admin"
    }];

    users.forEach(function (user) {
        new UsersList(user).save();
    });

    var offers = [{
        offerId: "1000",
        name: "Krishna",
        car: "Swift",
        seatsLeft: 2,
        pickUp: "MNG SEZ",
        destination: "Pumpwell"
    },
    {
        offerId: "1001",
        name: "Shiva",
        car: "Audi",
        seatsLeft: 3,
        pickUp: "MNG SEZ",
        destination: "Kottara"
    },
    {
        offerId: "1002",
        name: "Preethi",
        car: "Huidai i10",
        seatsLeft: 2,
        pickUp: "Hampankatta",
        destination: "MNG SEZ"
    },
    {
        offerId: "1003",
        name: "Deepak",
        car: "Range Rover",
        seatsLeft: 1,
        pickUp: "MNG SEZ",
        destination: "MNG STP"
    },
    {
        offerId: "1004",
        name: "Harsh",
        car: "Maruti",
        seatsLeft: 3,
        pickUp: "Infosys",
        destination: "MNG SEZ"
    },
    {
        offerId: "1005",
        name: "Rishabh",
        car: "Swift Dzire",
        seatsLeft: 1,
        pickUp: "Infosys",
        destination: "MNG SEZ"
    },
    {
        offerId: "1006",
        name: "Saransh",
        car: "Huidai i10",
        seatsLeft: 2,
        pickUp: "Hampankatta",
        destination: "Infosys"
    }]

    offers.forEach(function (offer, index) {
        offer.id = index + 1;
        new OffersList(offer).save();
    });

    console.log('data stored successfully');

});