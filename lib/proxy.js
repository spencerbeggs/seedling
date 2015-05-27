"use strict";

var config = require("../config");
var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({
	target: "http://127.0.0.1:" + config.app.port
}).listen(config.proxy.port, function() {
	console.log(config.app.name + " proxy listening on port " + config.proxy.port);
	console.log("passing traffic to " + config.app.hostname + " to 127.0.0.1:" + config.app.port);
	console.log("make sure the following line needs to be in /etc/hosts: ");
	console.log("rdr pass on lo0 inet proto tcp from any to any port 80 -> 127.0.0.1 port " + config.proxy.port);
});

module.exports = proxy;
