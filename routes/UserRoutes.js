var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var crypto = require('crypto');



module.exports = router;