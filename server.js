var express = require('express'),
	path = require('path'),
  meta = require('./meta'),
  api = require('./api'),
  userApi = require('./api/user'),
  timelineApi = require('./api/timeline'),
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

	// console.log(method, url);
	next();
});


app.use('/api/timeline', timelineApi);
app.use('/api/user', userApi);
app.use('/api', api);

app.use('/meta', meta);



// Static files
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/public/app'));
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


// App Listen
app.listen(app.get('port'), function(){
	console.log("App: Listening on "+app.get('port'));
});
