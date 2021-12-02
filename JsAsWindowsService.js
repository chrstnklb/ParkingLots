var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Start Parkerlaubnisse Application',
  // description: 'The nodejs.org example web server.',
  script: 'C:\\LPR-DB\\ParkingLots\\ParkingLots-develop\\server\\express.js'
});

var svc2 = new Service({
  name:'Start Parkerlaubnisse FTP Server',
  // description: 'The nodejs.org example web server.',
  script: 'C:\\LPR-DB\\ParkingLots\\ParkingLots-develop\\server\\ftp-server\\ftp-server.js'
});

var svc3 = new Service({
  name:'Start Parkerlaubnisse Cron Job',
  // description: 'The nodejs.org example web server.',
  script: 'C:\\LPR-DB\\ParkingLots\\ParkingLots-develop\\server\\ftp-server\\cron.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc2.on('install',function(){
  svc2.start();
});

svc3.on('install',function(){
  svc3.start();
});

// svc.install();
// svc2.install();
svc3.install();