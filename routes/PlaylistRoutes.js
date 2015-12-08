var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secret_songs'
});

router.get('/', auth, function(req, res) {
	Playlist.find({})
	.exec(function(err, playlist) {
		if(err) return res.status(500).send({err: "Error getting all playlists"});
		if(!playlist) return res.status(400).send({err: "Playlists do not exist"});
		res.send(playlist);
	})
});

router.post('/', auth, function(req, res) {
	var playlist = new Playlist(req.body);
	playlist = req.payload.id;
	playlist.created = new Date();
	playlist.save(function(err, playlist) {
		if(err) return res.status(500).send({err: "Issues with creating a playlist"});
		if(!playlist) return res.status(400).send({err: "Could not create a playlist"});
		res.send(playlist)
	});
});

router.delete('/:id', auth, function(req, res) {
	Playlist.remove({_id: req._id})
	.exec(function(err, playlist) {
		if(err) return res.status(500).send({err: "Error with deleting the playlist"});
		if(!playlist) return res.status(400).send({err: "Playlist does not exist"});
		res.send();
	})
})

router.put('/:id', auth, function(req, res) {
	Playlist.update({_id: req.body._id}, req.body)
	.exec(function(err, playlist) {
		if(err) return res.status(500).send({err: "Error getting playlist to edit"});
		if(!playlist) return res.status(400).send({err: "Playlist to edit does not exist"});
		res.send(req.body);
	})
})

module.exports = router;