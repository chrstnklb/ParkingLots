let waitingCars = [];


// TODO: irgendwo lassen sich zuweisungen einsparen, alles auf ejs ebene machen
module.exports.addWaitingCar = function (waitEvent) {
    let car = {
        parkingLot: waitEvent.parkingLot,
        plate: waitEvent.plate,
        time: waitEvent.time,
        parkerlaubnisse: waitEvent.parkerlaubnisse
    }

    while (waitingCars.length >= 10)
        waitingCars.shift();
    waitingCars.push(car);
    console.log('waitingCars :>> ', waitingCars);
    // refresh UI
}

module.exports.getWaitingCars = function () {
    return waitingCars;
}

// function addWaitEventList() {
//     alert("jo")
//     let waitEventInUi = document.createElement("div");
//     waitEventInUi.text = waitingCars;
//     document.getElementById("monitor-body").appendChild(waitEventInUi);
// }