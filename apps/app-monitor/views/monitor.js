// const db = require("../../server/db/db.js");

let waitingCars = [];

// TODO: irgendwo lassen sich zuweisungen einsparen, alles auf ejs ebene machen
module.exports.addWaitingCar = async function (waitEvent) {

    let car = {
        zeitpunkt: waitEvent.zeitpunkt,
        parkplatz: waitEvent.parkplatz,
        kennzeichen: waitEvent.kennzeichen
        // kennzeichen: waitEvent
    }
    console.log("🚀 ~ file: monitor.js ~ line 18 ~ car", car)

    // car.parkerlaubnisse = await getCarInformationFromDatabase(car);
    car.parkerlaubnisse = searchForKennzeichen(car.kennzeichen);
    addWaitingCarRegardingLimit(car);

}

// async function searchForKennzeichen(kennzeichen) {

//     const all = await db.search();
//     console.log("🚀 ~ file: monitor.js ~ line 25 ~ all ~ all", all)


//     // let all = db.search();

//     // data.forEach(element => {
//     //     allPermissions.push(element.doc)
//     // });
// }

function addWaitingCarRegardingLimit(car) {
    console.log("🚀 ~ file: monitor.js ~ line 43 ~ addWaitingCarRegardingLimit ~ car", car)
    if (car.parkplatz === "P1") parkplatz1 = car;
    if (car.parkplatz === "P2") parkplatz2 = car;
    if (car.parkplatz === "P3") parkplatz3 = car;
    if (car.parkplatz === "P4") parkplatz4 = car;
    if (car.parkplatz === "P5") parkplatz5 = car;
    if (car.parkplatz === "P6") parkplatz6 = car;

    while (waitingCars.length >= 10)
        waitingCars.shift();
    waitingCars.push(car);
    console.log("🚀 ~ file: monitor.js ~ line 49 ~ addWaitingCarRegardingLimit ~ waitingCars", waitingCars)
}

// function getCarInformationFromDatabase(car) {
//     return db.findByKennzeichen(car.kennzeichen, function (err, parkerlaubnisse) {
//         if (err) console.log(err);
//         else return parkerlaubnisse
//     })
// }

module.exports.getWaitingCars = function () {
    console.log("waiting car" + JSON.stringify(waitingCars[0]))
    console.log("waiting cars" + JSON.stringify(waitingCars))
    return waitingCars;
}