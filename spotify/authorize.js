var express = require('express'),
	http	= require('http'),
	bodyParser = require('body-parser'),
	_config = require('../_config');

var spotifyAuth = express();

spotifyAuth.use(bodyParser.json());

spotifyAuth.get('/', function(req, res) {
	res.send('GET ' + req.originalUrl);
});

spotifyAuth.post('/', function(req, res){

	var string = [
		'POST', req.originalUrl, "\n",
		'-- params:', JSON.stringify(req.params), "\n",
		'-- body:', JSON.stringify(req.body), "\n"
	].join(' ');


	var state = req.body['state'] || 'null';
	var queryString = assembleQueryString(state);

	var getAddress = 'https://accounts.spotify.com/authorize/'+queryString;

	console.log('redirect to:', getAddress);
	res.redirect(getAddress);

	// var scopes: string[] = ;
	// var queryString: string = this.assembleQueryString(state);
	//
	// console.info('queryString', queryString);
	// console.info('getAddress', getAddress);


});

spotifyAuth.get('/callback', function(req, res) {
	console.log('get req', req);
});

spotifyAuth.post('/callback', function(req, res) {
	console.log('post req', req);
});

module.exports = spotifyAuth;

var getSpotifyAuthorizationCode = function(callback) {
	return http.get({
		host: 'accounts.spotify.com',
		path: '/authorize/',
		method: 'GET'
	})
};




// Helper Functions

var extractData = function(res) {
	var body = res.json();
	return body.data || { };
};

var handleError = function(error) {
	console.error(error);
};

var assembleQueryString = function(state) {
	var client_id = _config.spotify.client_id;
	var response_type = 'code';
	var redirect_uri = __dirname + _config.spotify.redirect.callback;
	var scopes = _config.spotify.scopes.join(' ');



	return ['?client_id=', client_id,
	'&scopes=', encodeURIComponent(scopes),
	'&response_type=', response_type,
	'&redirect_uri=', encodeURIComponent(redirect_uri),
	'&state=', state].join('');
};

var generateState = function(length) {
	var text = '';
	var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		var randomCharIndex = Math.floor(Math.random() * possible.length);
		text += possible.charAt(randomCharIndex);
	}
	return text;
}
