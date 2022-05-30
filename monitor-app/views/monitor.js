const db = require('../../server/db/db.js')

let waitingCars = [];


// TODO: irgendwo lassen sich zuweisungen einsparen, alles auf ejs ebene machen
module.exports.addWaitingCar = async function (waitEvent) {
    let car = {
        zeitpunkt: waitEvent.zeitpunkt,
        parkplatz: waitEvent.parkplatz,
        kennzeichen: waitEvent.kennzeichen
    }

    car.parkerlaubnisse = await getCarInformationFromDatabase(car);
    addWaitingCarRegardingLimit(car);

}

function addWaitingCarRegardingLimit(car) {
    while (waitingCars.length >= 10)
        waitingCars.shift();
    waitingCars.push(car);
}

function getCarInformationFromDatabase(car) {
    return db.findByKennzeichen(car.kennzeichen, function (err, parkerlaubnisse) {
        if (err) console.log(err);
        else return parkerlaubnisse
    })
}


module.exports.getWaitingCars = function () {
    return waitingCars;
}