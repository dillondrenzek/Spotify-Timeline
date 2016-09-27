var express = require('express'),
	bodyParser = require('body-parser'),
	_config = require('../_config'),
	request = require('request'),
	querystring = require('querystring'),
	cookieParser = require('cookie-parser');


// 	"/spotify"
var spotify = express();

spotify.use(cookieParser());

var stateKey = 'spotify_auth_state';





spotify.get('/authorize', function(req, res) {

	var state = generateState(16);
	res.cookie(stateKey, state);

	var queryString = querystring.stringify({
		response_type: 		'code',
		client_id: 			_config.spotify.client_id,
		scope: 				_config.spotify.scopes.join(' '),
		redirect_uri:		_config.spotify.redirect_uri,
		state:				state
	});

	var getAddress = 'https://accounts.spotify.com/authorize?'+queryString;

	// console.log('redirect to:', getAddress);
	res.redirect(getAddress);
});


spotify.get('/authorize/callback', function(req, res) {
	// console.log('get req', req);

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state !== null && state === storedState) {

		res.clearCookie(stateKey);
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: _config.spotify.redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer(_config.spotify.client_id+':'+_config.spotify.client_secret).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: { 'Authorization': 'Bearer ' + access_token },
          			json: true
				};

				console.log('access_token', access_token);
				console.log('refresh_token', refresh_token);

				// we can also pass the token to the browser to make requests from there

		        res.redirect('/me/callback?' +
		          querystring.stringify({
		            access_token: access_token,
		            refresh_token: refresh_token
		          }));
			}
		});

	} else {
		res.redirect('/#' +
	      querystring.stringify({
	        error: 'state_mismatch'
	      }));
	}
});




module.exports = spotify;



// Helper Functions

var extractData = function(res) {
	var body = res.json();
	return body.data || { };
};

var handleError = function(error) {
	console.error(error);
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

// var assembleQueryString = function(state) {
// 	var client_id = _config.spotify.client_id;
// 	var response_type = 'code';
// 	var redirect_uri =  _config.spotify.redirect_uri;
// 	var scopes = _config.spotify.scopes.join(' ');
//
//
//
// 	return ['?client_id=', client_id,
// 	'&scopes=', encodeURIComponent(scopes),
// 	'&response_type=', response_type,
// 	'&redirect_uri=', encodeURIComponent(redirect_uri),
// 	'&state=', state].join('');
// };
