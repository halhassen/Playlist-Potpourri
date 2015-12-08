var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	name: String,
	username: {type:String, lowercase:true, unique:true},
	passwordHash: String,
	pic: String,
	salt: String,
	created: Date, //system reminds of birthdays!
	playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "Playlist"}],
	//add more
});

UserSchema.methods.generateJWT = function() {
	console.log("DEBUG: UserSchema.methods.generateJWT called");
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 36500);
	return jwt.sign({
		id: this._id,
		username: this.username,
		exp: exp.getTime() / 1000
	}, "_secret_songs");
};

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(64).toString('hex');
	this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');;
};

UserSchema.methods.checkPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return hash === this.passwordHash;
};


mongoose.model('User', UserSchema);