// Main Server
// v0.0.6

var express = require('express'),
	app = express(),
	path = require('path');



//-----------
// App Setup
//-----------

// App Port
app.set('port', (process.env.PORT || 8081));


// Public Directories
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/built', express.static(__dirname + '/built'));


// App Listen
app.listen(app.get('port'));
console.log("App: Listening on "+app.get('port'));
