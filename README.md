CheferizeIt.js
==============

CheferizeIt is a simple node module that converts English to Mock Swedish, Bork Bork Bork! Whether or not you find this useful I'm sure you will find some humor in the results.  Seriously who doesn't love the muppets and the Swedish Chef?...

What Makes CheferizeIt Cool
---------------------------

* It will make your friends laugh
* Its packaged away in a node module so <code>require</code> it and your cookin.
* You can throw utensils in the air while coding.
* It has no dependencies so use it anywhere with anything.
* So what if theres a ton out there. Yours is for Node.

Installation
------------

<pre><code>$ npm install cheferizeIt</code></pre>

Usage
------

The module consist of a single method called <code>cheferize</code>.

<pre><code>var chef = require("cheferizeIt");

	chef.cheferize("string");
</code></pre>

This method takes a string (single word or sentance) and translates it by breaking it up into words and calling <code>encheferizeWord()</code>. These words are run through the translation rules and added back to the <code>strOut</code> variable and returned.

The example provided its nothing very advanced just enough for proof of concept.  It will take anything in the pathname of the url, translate it, and output it back on the screen.

Poot zee cheeckee in zee put

<pre><code>var http = require("http"),
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
	console.log(strOut);
	res.write(strOut);
	res.end();
})
</code></pre>

I Don't Actually Know Mock Swedish...
--------------------------------------
I hope you weren't thinking I was an expert Mock Swedish translator...  I know total disappointment.

The translation rules were taken from one of the various sources across the net.  My choosen source came courtesy of Andriy Rozeluk at <http://www.tuco.de/home/jschef.htm>.  Thanks Dood!   

