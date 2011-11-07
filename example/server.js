/**
 * Module dependencies.
 */ 
var http = require("http"),
	url = require("url"),
	chef = require("../lib/cheferizeIt");

// Create node.js server
http.createServer(function(req, res) {
	// This grabs the pathname after the base url from the request.
	var strOut = "";
	var uri = url.parse(req.url).pathname;
	uri = uri.replace("/","");
	if (uri !== "favicon.ico"){
		strOut = chef.cheferize(uri);
		strOut = strOut.replace(/%20/g," ");
	}
	res.write(strOut);
	res.end();
}).listen(12449);