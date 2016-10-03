var express = require('express'),
  packageJson = require('../package.json'),
	cookieParser = require('cookie-parser');


// 	"/meta"
var meta = express();

meta.use(cookieParser());


meta.get('/version', function(req, res) {
  res.send({
    version: packageJson['version']
  });
});

module.exports = meta;
