"use strict";
var express = require('express');
var meta_1 = require('./api/meta');
//-----------
// App Setup
//-----------
var app = express();
// App Port
app.set('port', (process.env.PORT || 8081));
// Get Meta App info
app.use('/meta', meta_1.metaApi);
// Static files
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/public/app'));
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
// App Listen
app.listen(app.get('port'), function () {
    console.log("App: Listening on " + app.get('port'));
});
//# sourceMappingURL=server.js.map