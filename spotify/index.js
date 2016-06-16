var express = require('express');
var spotifyAuth = require('./authorize');

module.exports = function(){

	var spotify = express();

	spotify.use('/authorize', spotifyAuth);

};
