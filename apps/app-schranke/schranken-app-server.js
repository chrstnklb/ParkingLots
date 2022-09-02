var net = require('net');
const { schrankenAppIp, schrankenAppPort } = require('../../config.js');
let console = require('../util/log.js');
const vorfaelle = require('../app-monitor/server/vorfaelle.js');

let connectionCount = 0;

function startTcpServer() {

    console.log("Gonna start TCP Server!")

    var server = net.createServer(function (socket) {

        socket.write('I received your request.\r\n');

        socket.on('data', function (chunk) {
            let vorfall = chunk.toString();
            console.log(`Camera send vorfall`, vorfall);

            vorfaelle.saveVorfall(vorfall);

            console.log(`${vorfall} was added as number:`, connectionCount++);
        });

        socket.on('end', function () { console.log('Closing connection with the client'); });
        socket.on('error', function (err) { console.log(`Error: ${err}`); });
    });

    server.listen(schrankenAppPort, schrankenAppIp);
    console.log('TCP server started and is listening on', schrankenAppIp + ':' + schrankenAppPort);
}

startTcpServer();