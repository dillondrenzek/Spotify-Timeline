var express = require('express'),
  packageJson = require('../package.json'),
	cookieParser = require('cookie-parser');


// 	"/meta"
var api = express();

api.use(cookieParser());


api.get('/timeline', function(req, res) {
  res.send({
    version: packageJson['version']
  });
});

api.post('/timeline/destroy', function(req, res) {
  res.send({
    version: packageJson['version']
  });
});

module.exports = api;
