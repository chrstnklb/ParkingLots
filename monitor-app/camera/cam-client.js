const axios = require('axios').default;
const time = require('../../server/util/time.js')

function sendPlateToServer(parkplatz, kennzeichen) {

    const URL = "http://127.0.0.1:3001";

    axios({
        method: 'post',
        url: URL + '/plate',
        data: {
            zeitpunkt: time.getNowAsHH_MM_SS(),
            parkplatz: parkplatz,
            kennzeichen: kennzeichen,
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