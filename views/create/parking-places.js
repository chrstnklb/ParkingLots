function getParkingLotName(parkingLot) {
    return parkingLot
        .parentNode
        .getElementsByTagName("label")[0]
        .getElementsByTagName("h5")[0]
        .textContent;
}

function getInputValuesForParkingLotsAsString() {
    let parkingLotsValues = "";

    Array.prototype.forEach.call(getParkingLots(), parkingLot => {
        if(parkingLot.checked) {
            parkingLotsValues += getParkingLotName(parkingLot) + " ";
        }
    });
    return parkingLotsValues;
}

function getParkingLots() {
    return document.getElementsByClassName("parking-lot");
}

function uncheckAllParkingPlacesCheckboxes() {

    // Because parkingLotsCheckboxes is an array like type, not a collection of objects
    Array.prototype.forEach.call(getParkingLots(), parkingLot => {
        parkingLot.checked = false;
    });

}

// function editParkingPlacesCheckboxes(checkBoxState, parkingPlaces) {

//     let parkingLotsCheckBoxes = document.getElementsByClassName("parking-lot");

//     for (let parkingLotIndex = 0; parkingLotIndex < parkingLotsCheckBoxes.length; parkingLotIndex++) {

//         let parkingLot = parkingLotsCheckBoxes[parkingLotIndex];

//         if (parkingPlaces.includes(getParkingLotName(parkingLot))) {
//             parkingLot.checked = checkBoxState;
//         }
//     }
// }