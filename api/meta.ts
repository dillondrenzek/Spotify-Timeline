import express = require('express');
let packageJson = require('../package.json');



// 	"/meta"
export let metaApi = express();

metaApi.get('/version', function(req, res) {
  res.send({
    version: packageJson['version']
  });
});
