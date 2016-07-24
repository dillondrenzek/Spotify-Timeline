var express = require('express'),
	path = require('path'),
	spotify = require('./spotify'),
	_config = require('./_config');

//-----------
// App Setup
//-----------
var app = express();

// App Port
app.set('port', (process.env.PORT || 8081));

app.use('/*', function(req, res, next){
	var method = req.method.toUpperCase();
	var url = req.originalUrl;

	console.log(method, url);
	next();
});




app.use('/spotify', spotify);

// Static files
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/built', express.static(__dirname + '/built'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));
app.get('/me', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


// App Listen
app.listen(app.get('port'), function(){
	console.log("App: Listening on "+app.get('port'));
});
