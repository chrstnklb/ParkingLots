var net = require('net');

const vorfaelle = require('../app-monitor/server/vorfaelle.js');

let connectionCount = 0;

function startTcpServer() {

    console.log("Gonna start TCP Server!")

    var server = net.createServer(function (socket) {
        console.log("Server Started")
        socket.write('Echo server');

        socket.on('data', function (chunk) {
            console.log(`Data received from client: ${chunk.toString()}.`)
            console.log(`connectionCount: ${connectionCount++}.`)
            console.log(`Add to list of waiting cars`);

            // writeToJson(chunk.toString());
            vorfaelle.saveVorfall(chunk.toString());

            console.log(`Added`);
        });

        socket.on('end', function () { console.log('Closing connection with the client'); });
        socket.on('error', function (err) { console.log(`Error: ${err}`); });
    });

    server.listen(1337, '127.0.0.1');
    // server.listen(1337, '192.168.0.182');
    // server.listen(1337, '192.168.0.249');
}

startTcpServer();