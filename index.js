var express = require('express'),
	path = require('path'),
	spotify = require('./spotify'),
	_config = require('./_config.js');

//-----------
// App Setup
//-----------
var app = express();

// App Port
app.set('port', (process.env.PORT || 8081));


// Static files
app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/built', express.static(__dirname + '/built'));
app.use('/app', express.static(__dirname + '/app'));

// Spotify Authorize
app.use('/spotify', spotify);


// App Listen
app.listen(app.get('port'), function(){
	console.log("App: Listening on "+app.get('port'));
});
