var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqclient = require("./mqclient.js");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.post('/', function(req, res) {
    console.log("request " + req.body);
    mqclient.send(req.body);
    res.end("ok");
});
app.listen(3000, function() {
    console.log("Started on PORT 3000");
})