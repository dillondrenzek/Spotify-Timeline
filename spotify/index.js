var express = require('express'),
	bodyParser = require('body-parser'),
	_config = require('../_config'),
	request = require('request'),
	querystring = require('querystring'),
	cookieParser = require('cookie-parser'),
  spotifyUsers = require('./users');


// 	"/spotify"
var spotify = express();



spotify.use(cookieParser());



spotify.use('/users', spotifyUsers);

module.exports = spotify;
