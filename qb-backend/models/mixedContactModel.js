const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const mixedContactSchema = new Schema({
	'name' : String,
	'email' : String,
	'githubUser' : String,
	'githubLocation' : String,
	'githubId' : Number,
	'freshdeskTimeZone' : String,
	'freshdeskId' : Number
});

module.exports = mongoose.model('mixedContact', mixedContactSchema);
