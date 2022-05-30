let waitingCars = [];


// TODO: irgendwo lassen sich zuweisungen einsparen, alles auf ejs ebene machen
module.exports.addWaitingCar = function (waitEvent) {
    let car = {
        zeitpunkt: waitEvent.zeitpunkt,
        parkplatz: waitEvent.parkplatz,
        kennzeichen: waitEvent.kennzeichen,
        parkerlaubnisse: waitEvent.parkerlaubnisse
    }

    while (waitingCars.length >= 10)
        waitingCars.shift();
    waitingCars.push(car);
}

module.exports.getWaitingCars = function () {
    return waitingCars;
}