var express = require('express'),
  packageJson = require('../package.json'),
  userApi = require('./user'),
	cookieParser = require('cookie-parser');


// 	"/api"
var timelineApi = express();

timelineApi.use(cookieParser());

timelineApi.get('/timeline', function(req, res) {
  res.send({
    version: packageJson['version']
  });
});

timelineApi.post('/timeline/destroy', function(req, res) {
  res.send({
    version: packageJson['version']
  });
});

module.exports = timelineApi;
