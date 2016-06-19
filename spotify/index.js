var express = require('express');
var spotifyAuth = require('./authorize');

var spotify = express();

spotify.use('/authorize', spotifyAuth);


module.exports = spotify;
