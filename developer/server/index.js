var app = require("express"),
		api = require("../api/api_index.js")

module.exports = function(port){
	var express = require('express');
	var app = express();

	app.set('views', __dirname)
	app.use("/public",express.static(api.core.getPath("dist")))
	app.set('view engine', 'jade');

	app.get('/', function (req, res) {
		res.render('html.jade');
	});

	app.listen(port);
}
