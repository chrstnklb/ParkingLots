const axios = require('axios').default;
const time = require('../../server/util/time.js')

const monitorAppUrl = 'http://127.0.0.1:3001';



function callDb() {
    axios.get(url, {
        params: { name: 'admin', password: 'admin', }
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    }).then(function () {// always executed});
    });
}

function callServer() {
    axios.get(monitorAppUrl, {
        params: '/search' //{ name: 'admin', password: 'admin', }
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    }).then(function () {// always executed});
    });
}

function sendPlateToServer(parkingLot, plate) {
    axios({
        method: 'post',
        url: monitorAppUrl + '/plate',
        data: {
            time: time.getNowAsHH_MM_SS(),
            parkingLot: parkingLot,
            plate: plate,
            parkerlaubnisse: 'P1, P2'
        }
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    }).then(function () {// always executed});
    });
}

// callServer();
sendPlateToServer('P1', 'PL AT 3 E');
sendPlateToServer('P2', 'YOU R Gay');
sendPlateToServer('P3', 'Zen Keichen');
sendPlateToServer('P1', '123456 E');