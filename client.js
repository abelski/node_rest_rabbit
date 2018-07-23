var mqclient = require("./mqclient.js");
mqclient.receive(function (msg) {
	console.log(" [x] Received %s", msg.content.toString());
});