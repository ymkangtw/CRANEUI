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

//--------------------------------
// CRANE RESPONSE, CONNECTION 2
//--------------------------------
//DB1921, RSPMOV01
action_completed_recv = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: '',
    COILID: '',
    RESULT: '',
    POSX: '',
    POSY: '',
    POSZ: '',
    ERRORCODE: ''
};
//DB1922, ACKWMS01
action_completed_ack = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: '',
    CMDID: '',
    CMDWORKTIME: ''
};

client2.connect(PORT2, HOST, function() {
    console.log('Connect to: ' + HOST + ':' + PORT2);

    //RECV CRANE ACTION COMPLETED
    client2.on('data', function(data) {
        var sendBuf = new Buffer(92);
        var recvBuf = new Buffer(data);

        action_completed_recv.WORKID = recvBuf.slice(2, 2 + recvBuf.readInt8(1)).toString().trim();
        action_completed_recv.HOUSEID = recvBuf.slice(20, 20 + recvBuf.readInt8(19)).toString().trim();
        action_completed_recv.CRANEID = recvBuf.slice(30, 30 + recvBuf.readInt8(29)).toString().trim();
        action_completed_recv.WORKTIME = recvBuf.slice(40, 40 + recvBuf.readInt8(39)).toString().trim();
        action_completed_recv.COILID = recvBuf.slice(58, 58 + recvBuf.readInt8(57)).toString().trim();
        action_completed_recv.RESULT = recvBuf.readInt16BE(74);
        action_completed_recv.POSX = recvBuf.readFloatBE(76).toFixed(2);
        action_completed_recv.POSY = recvBuf.readFloatBE(80).toFixed(2);
        action_completed_recv.POSZ = recvBuf.readFloatBE(84).toFixed(2);
        action_completed_recv.ERRORCODE = recvBuf.readInt16BE(88);
        sio.sockets.emit('recvActionCompleted', action_completed_recv);
        console.log('[ACT] <- [PLC]: ' + action_completed_recv.WORKTIME);

        //SEND ACTION COMPLETED ACK TO CRANE
        var currentDT = moment(new Date()).format('YYYYMMDDHHmmss');
        action_completed_ack.WORKID = 'ACKWMS01';
        action_completed_ack.HOUSEID = '25';
        action_completed_ack.CRANEID = 'D0822';
        action_completed_ack.WORKTIME = currentDT;
        action_completed_ack.CMDID = action_completed_recv.WORKID;
        action_completed_ack.CMDWORKTIME = action_completed_recv.WORKTIME;
        //WORKID
        sendBuf.writeInt8(16, 0);
        sendBuf.writeInt8(action_completed_ack.WORKID.length, 1);
        sendBuf.fill(action_completed_ack.WORKID, 2, 2 + action_completed_ack.WORKID.length);
        //HOUSEID
        sendBuf.writeInt8(10, 18);
        sendBuf.writeInt8(action_completed_ack.HOUSEID.length, 19);
        sendBuf.fill(action_completed_ack.HOUSEID, 20, 20 + action_completed_ack.HOUSEID.length);
        //CRANEID
        sendBuf.writeInt8(10, 28);
        sendBuf.writeInt8(action_completed_ack.CRANEID.length, 29);
        sendBuf.fill(action_completed_ack.CRANEID, 30, 30 + action_completed_ack.CRANEID.length);
        //WORKDTIME
        sendBuf.writeInt8(16, 38);
        sendBuf.writeInt8(action_completed_ack.WORKTIME.length, 39);
        sendBuf.fill(action_completed_ack.WORKTIME, 40, 40 + action_completed_ack.WORKTIME.length);
        //CMDID
        sendBuf.writeInt8(16, 56);
        sendBuf.writeInt8(action_completed_ack.WORKTIME.length, 57);
        sendBuf.fill(action_completed_ack.WORKTIME, 58, 58 + action_completed_ack.WORKTIME.length);
        //CMDWORKTIME
        sendBuf.writeInt8(16, 74);
        sendBuf.writeInt8(action_completed_ack.CMDWORKTIME.length, 75);
        sendBuf.fill(action_completed_ack.CMDWORKTIME, 76, 76 + action_completed_ack.CMDWORKTIME.length);

        client2.write(sendBuf);
        sio.sockets.emit('ackActionCompleted', action_completed_ack);
        console.log('[ACT] -> [PLC]: ' + action_completed_ack.WORKTIME);

        delete sendBuf;
        delete recvBuf;
    });
    client2.on('close', function() {
        console.log('Connection2 closed');
    });
});

//--------------------------------
//  COMMAND TO CRANE, CONNECTION 1
//--------------------------------
//DB1912, CMDMOV01
cmd_req = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: '',
    COILID: '',
    FROMX: '',
    FROMY: '',
    FROMZ: '',
    TOX: '',
    TOY: '',
    TOZ: '',
    COILINNDIA: '',
    COILOUTDIA: '',
    COILWIDTH: '',
    COILWEIGHT: ''
};

//DB1911, ACKPLC01
cmd_ack = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: '',
    CMDID: '',
    CMDWORKTIME: '',
    ERRORCODE: '',
    COILID: '',
    FROMX: '',
    FROMY: '',
    FROMZ: '',
    TOX: '',
    TOY: '',
    TOZ: '',
    COILINNDIA: '',
    COILOUTDIA: '',
    COILWIDTH: '',
    COILWEIGHT: ''
};

client1.connect(PORT1, HOST, function() {
    console.log('Connect to: ' + HOST + ':' + PORT1);
    //SEND COMMAND TO CRANE

    setInterval(function() {
        var sendBuf = new Buffer(114);
        sendBuf.fill(0, 0, 114);

        var currentDT = moment(new Date()).format('YYYYMMDDHHmmss');
        cmd_req = {
            WORKID: 'CMDGET01',
            HOUSEID: '25',
            CRANEID: 'D0822',
            WORKTIME: currentDT,
            COILID: 'F12345',
            FROMX: 4.1,
            FROMY: 1.5,
            FROMZ: 5.5,
            TOX: 20.0,
            TOY: 12.5,
            TOZ: 5.8,
            COILINNDIA: 0.508,
            COILOUTDIA: 1.1,
            COILWIDTH: 1.2,
            COILWEIGHT: 9.6
        };
        //WORKID
        sendBuf.writeInt8(16, 0);
        sendBuf.writeInt8(cmd_req.WORKID.length, 1);
        sendBuf.fill(cmd_req.WORKID, 2, 2 + cmd_req.WORKID.length);
        //HOUSEID
        sendBuf.writeInt8(10, 18);
        sendBuf.writeInt8(cmd_req.HOUSEID.length, 19);
        sendBuf.fill(cmd_req.HOUSEID, 20, 20 + cmd_req.HOUSEID.length);
        //CRANEID
        sendBuf.writeInt8(10, 28);
        sendBuf.writeInt8(cmd_req.CRANEID.length, 29);
        sendBuf.fill(cmd_req.CRANEID, 30, 30 + cmd_req.CRANEID.length);
        //WORKDTIME
        sendBuf.writeInt8(16, 38);
        sendBuf.writeInt8(cmd_req.WORKTIME.length, 39);
        sendBuf.fill(cmd_req.WORKTIME, 40, 40 + cmd_req.WORKTIME.length);
        //COILID
        sendBuf.writeInt8(16, 56);
        sendBuf.writeInt8(cmd_req.COILID.length, 57);
        sendBuf.fill(cmd_req.COILID, 58, 58 + cmd_req.COILID.length);
        //FROMX
        sendBuf.writeFloatBE(cmd_req.FROMX, 74);
        //FROMY
        sendBuf.writeFloatBE(cmd_req.FROMY, 78);
        //FROMZ
        sendBuf.writeFloatBE(cmd_req.FROMZ, 82);
        //TOX
        sendBuf.writeFloatBE(cmd_req.TOX, 86);
        //TOY
        sendBuf.writeFloatBE(cmd_req.TOY, 90);
        //TOZ
        sendBuf.writeFloatBE(cmd_req.TOZ, 94);
        //COILINNDIA
        sendBuf.writeFloatBE(cmd_req.COILINNDIA, 98);
        //COILOUTIDA
        sendBuf.writeFloatBE(cmd_req.COILOUTDIA, 102);
        //COILWIDTH
        sendBuf.writeFloatBE(cmd_req.COILWIDTH, 106);
        //COILWEIGHT
        sendBuf.writeFloatBE(cmd_req.COILWEIGHT, 110);

        client1.write(sendBuf);
        sio.sockets.emit('reqCMD', cmd_req);
        delete sendBuf;
        console.log('[CMD] -> [PLC]: ' + status_query.WORKTIME);
    }, 1000);

    //RECV COMMAND ACK
    client1.on('data', function(data) {
        var recvBuf = new Buffer(data);
        cmd_ack.WORKID = recvBuf.slice(2, 2 + recvBuf.readInt8(1)).toString().trim();
        cmd_ack.HOUSEID = recvBuf.slice(20, 20 + recvBuf.readInt8(19)).toString().trim();
        cmd_ack.CRANEID = recvBuf.slice(30, 30 + recvBuf.readInt8(29)).toString().trim();
        cmd_ack.WORKTIME = recvBuf.slice(40, 40 + recvBuf.readInt8(39)).toString().trim();
        cmd_ack.CMDID = recvBuf.slice(58, 58 + recvBuf.readInt8(57)).toString().trim();
        cmd_ack.CMDWORKTIME = recvBuf.slice(76, 76 + recvBuf.readInt8(75)).toString().trim();
        cmd_ack.ERRORCODE = recvBuf.readInt16BE(92);
        cmd_ack.COILID = recvBuf.slice(96, 96 + recvBuf.readInt8(95)).toString().trim();
        cmd_ack.FROMX = recvBuf.readFloatBE(112).toFixed(2);
        cmd_ack.FROMY = recvBuf.readFloatBE(116).toFixed(2);
        cmd_ack.FROMZ = recvBuf.readFloatBE(120).toFixed(2);
        cmd_ack.TOX = recvBuf.readFloatBE(124).toFixed(2);
        cmd_ack.TOY = recvBuf.readFloatBE(128).toFixed(2);
        cmd_ack.TOZ = recvBuf.readFloatBE(132).toFixed(2);
        cmd_ack.COILINNDIA = recvBuf.readFloatBE(136).toFixed(2);
        cmd_ack.COILOUTDIA = recvBuf.readFloatBE(140).toFixed(2);
        cmd_ack.COILWIDTH = recvBuf.readFloatBE(144).toFixed(2);
        cmd_ack.COILWEIGHT = recvBuf.readFloatBE(148).toFixed(2);
        console.log('[CMD] <- [PLC]: ' + cmd_ack.WORKTIME);
        sio.sockets.emit('rspCMDACK', cmd_ack);
        delete recvBuf;
    });
    client1.on('close', function() {
        console.log('Connection1 closed');
    });
});


//--------------------------------
//  QUERY CRANE STATUS, CONNECTION 3
//--------------------------------
//DB1932, REQSTS01
status_query = {
    WORKID: '',
    HOUSEID: '',
    CRANEID: '',
    WORKTIME: ''
};

//DB1931, RSPSTS01
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
        sio.sockets.emit('reqCraneStatus', status_query);
        delete sendBuf;
        console.log('[QRY] -> [PLC]: ' + status_query.WORKTIME);
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
        console.log('[QRY] <- [PLC]: ' + status_result.WORKTIME);
        sio.sockets.emit('rspCraneStatus', status_result);
        //console.log('X: ' + status_result.POSX + ', Y: ' + status_result.POSY + ', Z: ' + status_result.POSZ);
        //console.log(data);
        delete recvBuf;
    });
    client3.on('close', function() {
        console.log('Connection3 closed');
    });
});
