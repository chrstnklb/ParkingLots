var net = require('net');
var client = new net.Socket();
const { schrankenAppIp, schrankenAppPort } = require('../../config.js');
let console = require('../util/log.js');

let schrankenVorfaelle = [
    { parkplatz: 'P1', kennzeichen: 'SAW AB 123', },
    { parkplatz: 'P2', kennzeichen: 'BK-PO-123', },
    { parkplatz: 'P3', kennzeichen: 'BK-P3-123', },
    { parkplatz: 'P4', kennzeichen: 'BK-P4-123', },
    { parkplatz: 'P5', kennzeichen: '5.45', },
    { parkplatz: 'P6', kennzeichen: 'BSIX138', },
]


async function sendSchrankenVorfall() {
    while (true) {

        let randomIndex = Math.floor(Math.random() * schrankenVorfaelle.length);

        client.connect(schrankenAppPort, schrankenAppIp, function () {

            console.log('Try to send stuff to ', schrankenAppIp + ':' + schrankenAppPort)
            client.write(newMsg(schrankenVorfaelle[randomIndex]))

        }).on('data', function (data) {
            console.log('Received an answer from the server:', data);
            client.destroy(); // kill client after server's response

        }).on('close', function () {
            console.log('Disconnected from the server!');

        }).on('error', function (err) {
            if (err.code === 'ECONNREFUSED') { console.log(`Connection refused by server. Is it running? (${err.address}:${err.port})`); }
            if (err.code === 'ECONNRESET') { console.log('Connection reset'); }

        })

        await new Promise(resolve => setTimeout(resolve, 5000));

    }
}

function newMsg(schrankenVorfall) {
    return `${schrankenVorfall.parkplatz}#${schrankenVorfall.kennzeichen}`;
}

sendSchrankenVorfall();