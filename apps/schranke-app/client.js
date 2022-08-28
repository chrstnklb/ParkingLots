var net = require('net');
var client = new net.Socket();
const localHost = '127.0.0.1';
const prodHost = '192.168.0.201'
const port = 1337;

let schrankenVorfaelle = [
    { parkplatz: 'P1', kennzeichen: 'SAW AB 123', },
    { parkplatz: 'P2', kennzeichen: 'BK-PO-123', },
    { parkplatz: 'P3', kennzeichen: 'BK-P3-123', },
    { parkplatz: 'P4', kennzeichen: 'BK-P4-123', },
    { parkplatz: 'P5', kennzeichen: '5.45', },
    { parkplatz: 'P6', kennzeichen: 'BSIX138', },
]


module.exports.sendSchrankenVorfall = function () {
    //client.connect(port, prodHost, function () { // Siemens
    client.connect(port, localHost, function () {
        console.log('Connected');
        console.log(client.write(newMsg(schrankenVorfaelle[0])));
        console.log("done");
        // }).on('data', function (data) {
        //     console.log('Received: ' + data);
        //     client.destroy(); // kill client after server's response
        // }).on('close', function () {
        //     console.log('Disconnected');
    }).on('error', function (err) {
        console.log(`Error: ${err}`);
        throw err;
    })
}

module.exports.newMsg = function (schrankenVorfall) {
    return `${schrankenVorfall.parkplatz}#${schrankenVorfall.kennzeichen}`;
}