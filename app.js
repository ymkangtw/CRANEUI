var express = require('express');
var net = require('net');

var app = express();
app.use(express.static(__dirname));
var server = app.listen(80);
