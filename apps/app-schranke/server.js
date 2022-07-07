var net = require('net');
var fs = require('fs');

const date = require('../util/time.js');
// import function creteVorfall from vorfall.js
const createVorfall = require('../schranken-monitor-data-exchange/vorfall.js').createVorfall;

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
            createVorfall(chunk.toString());

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

// function writes data to json file
// function writeToJson(data) {
//     let kamera = data.split("#")[0];
//     let kennzeichen = data.split("#")[1];
//     // timestamp for now
//     let timestamp = date.getNowAsHH_MM_SS();
//     const vorfall = {
//         kamera: kamera,
//         kennzeichen: kennzeichen,
//         timestamp: timestamp
//     }
//     console.log(`Writing to json file`);
//     fs.writeFileSync(`./${kamera}.json`, JSON.stringify(vorfall));

//     // fs.writeFileSync('data.txt', data);
// }