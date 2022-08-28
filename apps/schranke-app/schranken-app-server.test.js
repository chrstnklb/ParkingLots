var net = require('net');
var client = new net.Socket();





test.skip('Schranken-App-Server', async (t) => {


    // client.connect(1337, '192.168.0.201', function () {// Siemens
    client.connect(1337, '127.0.0.1', function () {
        console.log('Connected');
        client.write('P1#BK-PO-123');
    });

    client.on('data', function (data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function () {
        console.log('Disconnected');
    });
})