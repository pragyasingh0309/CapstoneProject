var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RidesSchema = new Schema({
    rideId: Number,
    riderName: String,
    rideeName: String,
    pickUp: String,
    destination: String,
    status: String
});

module.exports = mongoose.model("RidesList", RidesSchema);
