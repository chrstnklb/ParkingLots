var net = require('net');

var client = new net.Socket();

client.connect(1337, '127.0.0.1', function () {
    // client.connect(1337, '192.168.0.249', function () {
    console.log('Connected');
    // client.write('P1#BK-PO-123');
    // client.write('P2#SAW-FR-22');
    // client.write('P3#BK-P3-123');
    // client.write('P4#BK-P4-123');
    // client.write('P5#BK-P555-123');
    // client.write('P6#BK-666-E');
    client.write('P4#cyTestKennzeichen');
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Disconnected');
});