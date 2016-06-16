var express = require('express'),
	http	= require('http'),
	_config = require('../_config');



module.exports = function(){

	var spotifyAuth = express();

	spotifyAuth.post('/', function(req, res){
		console.log('AUTHORIZE MODULE!!!');

		// var options = {
		// 	host: 'www.spotify.com',
		//
		// }
		//
		// var state = this.generateState(16);
		// var scopes: string[] = ['playlist-modify-public', 'streaming', 'user-library-read', 'user-read-birthdate', 'user-top-read'];
		// var queryString: string = this.assembleQueryString(state);
		//
		// console.info('queryString', queryString);
		//
		// var getAddress: string = 'https://accounts.spotify.com/authorize/'+queryString;
		//
		// console.info('getAddress', getAddress);


	});

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
	var client_id = this.client_id;
	var response_type = 'token';
	var redirect_uri = this.redirect_uri;

	return ['?client_id=', client_id,
	'&response_type=', response_type,
	'&redirect_uri=', redirect_uri,
	'&state=', state].join('');
};

var generateState = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		var randomCharIndex = Math.floor(Math.random() * possible.length);
		text += possible.charAt(randomCharIndex);
	}
	return text;
}
