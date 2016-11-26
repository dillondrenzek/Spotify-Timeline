var express = require('express'),
	path = require('path'),
  meta = require('./meta'),
	_config = require('./_config');

//-----------
// App Setup
//-----------
var app = express();

// App Port
app.set('port', (process.env.PORT || 8081));



// Get Meta App info
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
