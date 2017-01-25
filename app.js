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


/*
crane_status_query = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: ''
};

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
    //SEND Query CMD
    setInterval(function() {
        console.log('send data to plc');
        var sendBuf = new Buffer(56);
        sendBuf.fill(0, 0, 55);
        crane_status_query = {
            WORKID: 'REQSTS01',
            HOUSEID: '25',
            CRANEID: 'D0822',
            WORKTIME: '201701231610'
        };
        //WORKID
        sendBuf.writeInt8(16, 0);                                       //String array total length
        sendBuf.writeInt8(crane_status_query.WORKID.length, 1);         //String array actual length
        sendBuf.fill(crane_status_query.WORKID, 2, 2 + crane_status_query.WORKID.length);
        //HOUSEID
        sendBuf.writeInt8(10, 18); 				                        //String array total length
        sendBuf.writeInt8(crane_status_query.HOUSEID.length, 19); 	    //String array actual length
        sendBuf.fill(crane_status_query.HOUSEID, 20, 20 + crane_status_query.HOUSEID.length);
        //CRANEID
        sendBuf.writeInt8(10, 28); 				                        //String array total length
        sendBuf.writeInt8(crane_status_query.CRANEID.length, 29); 	    //String array actual length
        sendBuf.fill(crane_status_query.CRANEID, 30, 30 + crane_status_query.CRANEID.length);
        //WORKDTIME
        sendBuf.writeInt8(16, 38); 				                        //String array total length
        sendBuf.writeInt8(crane_status_query.WORKTIME.length, 39); 	    //String array actual length
        sendBuf.fill(crane_status_query.WORKTIME, 40, 40 + crane_status_query.WORKTIME.length);
        client3.write(sendBuf);
        delete sendBuf;
    }, 1000);
    //RECV QUERY DATA
    client3.on('data', function(data) {

        var recvBuf = new Buffer(data);
        crane_status.POSX = recvBuf.readFloatBE(58).toFixed(2);
        crane_status.POSY = recvBuf.readFloatBE(62).toFixed(2);
        crane_status.POSZ = recvBuf.readFloatBE(66).toFixed(2);
        console.log('X: ' + crane_status.POSX + ', Y: ' + crane_status.POSY + ', Z: ' + crane_status.POSZ);
        delete recvBuf;
    });
    client3.on('close', function() {
        console.log('Connection3 closed');
    });
});
*/