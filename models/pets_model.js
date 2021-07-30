const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
	nombre:{
		type:String,
		required: true
	},
	edad:{
		type:Number,
		required:false
	},
	raza:{
		type:String,
		required:false
	}
});

module.exports = mongoose.model('Pet', petSchema);

