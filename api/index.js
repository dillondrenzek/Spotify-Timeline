var express = require('express'),
  packageJson = require('../package.json'),
  userApi = require('./user'),
	cookieParser = require('cookie-parser');


// 	"/api"
var api = express();

api.use(cookieParser());

api.get('/user', userApi);

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
