function getParkingLotName(parkingLot) {

    return parkingLot.parentNode.parentNode.getElementsByTagName("span")[0].textContent;
;
}

function getInputValuesForParkingLotsAsString() {
    let parkingLotsValues = "";

    Array.prototype.forEach.call(getParkingLots(), parkingLot => {
        if(parkingLot.checked) {
            parkingLotsValues += getParkingLotName(parkingLot) + "-";
        }
    });
    parkingLotsValues = parkingLotsValues.slice(0,-1);
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