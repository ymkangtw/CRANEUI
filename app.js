var express = require('express');
var net = require('net');

var HOST = '192.168.0.100';
var PORT1 = 2000;
var PORT2 = 2001;
var PORT3 = 2002;

var app = express();
app.use(express.static(__dirname));
var server = app.listen(80);
var sio = require('socket.io').listen(server);
var client1 = new net.Socket();
var client2 = new net.Socket();
var client3 = new net.Socket();

crane_status = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: '',
    RESULT: 0,
    POSX: 0.0,
    POSY: 0.0,
    POSZ: 0.0,
    DEVSTATUS: 0,
    ERRORCODE: 0,
    ACCEPTABLE: 0,
    MODE: 0
};

client3.connect(PORT3, HOST, function() {
    console.log('Connect to: ' + HOST + ':' + PORT3);
    client3.on('data', function(data) {

        var recvBuf = new Buffer(data);
        crane_status.POSX = recvBuf.readFloatBE(58).toFixed(2);
        crane_status.POSY = recvBuf.readFloatBE(62).toFixed(2);
        crane_status.POSZ = recvBuf.readFloatBE(66).toFixed(2);
        console.log('X: ' + crane_status.POSX + ', Y: ' + crane_status.POSY + ', Z: ' + crane_status.POSZ);

    });
    client3.on('close', function() {
        console.log('Connection3 closed');
    });
});
