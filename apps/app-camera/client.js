var net = require('net');

var client = new net.Socket();

client.connect(1337, '127.0.0.1', function () {
    // client.connect(1337, '192.168.0.249', function () {
    console.log('Connected');
    client.write('P1#SAWPF123');
    client.write('P3#SAWFR11');
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Disconnected');
});