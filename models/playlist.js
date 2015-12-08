var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
	song: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
	title: String,
	created: Date,
	likes: Number,
	shares: Number,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

mongoose.model('Playlist', PlaylistSchema)