var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
	playlist: [{type: mongoose.Schema.Types.ObjectId, ref: "playlist"}],
	title: String,
	year: Date,
	artist: String,
	picture: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

mongoose.model('Song', SongSchema)