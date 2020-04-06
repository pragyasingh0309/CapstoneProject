var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OffersSchema = new Schema({
    id: Number,
	name: String,
	car: String,
	seatsLeft: Number,
	pickUp: String,
	destination: String
});

module.exports = mongoose.model("Offerslist", OffersSchema);
