var express = require('express');
var moment = require('moment');
var net = require('net');

var HOST = '192.168.0.101';
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


//DB1932
status_query = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: ''
};

//DB1931
status_result = {
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
        //console.log('send data to plc');
        var sendBuf = new Buffer(56);
        sendBuf.fill(0, 0, 55);

        var currentDT = moment(new Date()).format('YYYYMMDDHHmmss');
        status_query = {
            WORKID: 'REQSTS01',
            HOUSEID: '25',
            CRANEID: 'D0822',
            WORKTIME: currentDT
        };
        //WORKID
        sendBuf.writeInt8(16, 0);                                       //String array total length
        sendBuf.writeInt8(status_query.WORKID.length, 1);         //String array actual length
        sendBuf.fill(status_query.WORKID, 2, 2 + status_query.WORKID.length);
        //HOUSEID
        sendBuf.writeInt8(10, 18); 				                        //String array total length
        sendBuf.writeInt8(status_query.HOUSEID.length, 19); 	    //String array actual length
        sendBuf.fill(status_query.HOUSEID, 20, 20 + status_query.HOUSEID.length);
        //CRANEID
        sendBuf.writeInt8(10, 28); 				                        //String array total length
        sendBuf.writeInt8(status_query.CRANEID.length, 29); 	    //String array actual length
        sendBuf.fill(status_query.CRANEID, 30, 30 + status_query.CRANEID.length);
        //WORKDTIME
        sendBuf.writeInt8(16, 38); 				                        //String array total length
        sendBuf.writeInt8(status_query.WORKTIME.length, 39); 	    //String array actual length
        sendBuf.fill(status_query.WORKTIME, 40, 40 + status_query.WORKTIME.length);
        client3.write(sendBuf);
        delete sendBuf;
        console.log('send to plc: ' + status_query.WORKTIME);
    }, 1000);
    //RECV QUERY DATA
    client3.on('data', function(data) {

        var recvBuf = new Buffer(data);
        //status_result.WORKID = recvBuf.slice(0, 17).toString('ascii', 2, 17).trim();
        //status_result.HOUSEID = recvBuf.slice(18, 27).toString('ascii', 2, 9).trim();
        //status_result.CRANEID = recvBuf.slice(28, 37).toString('ascii', 2, 9).trim();
        //status_result.WORKTIME = recvBuf.slice(38, 55).toString('ascii', 2, 17).trim();
        status_result.WORKID = recvBuf.slice(2, 2 + recvBuf.readInt8(1)).toString().trim();
        status_result.HOUSEID = recvBuf.slice(20, 20 + recvBuf.readInt8(19)).toString().trim();
        status_result.CRANEID = recvBuf.slice(30, 30 + recvBuf.readInt8(29)).toString().trim();
        status_result.WORKTIME = recvBuf.slice(40, 40 + recvBuf.readInt8(39)).toString().trim();
        status_result.RESULT = recvBuf.readInt16BE(56);
        status_result.POSX = recvBuf.readFloatBE(58).toFixed(2);
        status_result.POSY = recvBuf.readFloatBE(62).toFixed(2);
        status_result.POSZ = recvBuf.readFloatBE(66).toFixed(2);
        status_result.DEVSTATUS = recvBuf.readInt32BE(70);
        status_result.ERRORCODE = recvBuf.readInt16BE(74);
        status_result.ACCEPTABLE = recvBuf.readInt16BE(76);
        status_result.MODE = recvBuf.readInt16BE(78);
        console.log('recv from plc: ' + status_result.WORKTIME);
        sio.sockets.emit('rspdata', status_result);
        //console.log('X: ' + status_result.POSX + ', Y: ' + status_result.POSY + ', Z: ' + status_result.POSZ);
        //console.log(data);
        delete recvBuf;
    });
    client3.on('close', function() {
        console.log('Connection3 closed');
    });
});
