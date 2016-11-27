import express = require('express');
import path = require('path');
import {metaApi} from './api/meta';

//-----------
// App Setup
//-----------
let app = express();

// App Port
app.set('port', (process.env.PORT || 8081));



// Get Meta App info
app.use('/meta', metaApi);



// Static files
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/public',        express.static(__dirname + '/public'));
app.use('/app',           express.static(__dirname + '/public/app'));
app.get('/*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});


// App Listen
app.listen(app.get('port'), () => {
	console.log("App: Listening on " + app.get('port'));
});
