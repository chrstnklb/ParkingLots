function generateEditButtons(id) {

    let button = document.createElement("button");
    button.setAttribute("id", "editButtonId" + id)
    button.setAttribute("class", "btn btn-primary editButton bi bi-pencil");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#insertPermissionModal");
    button.setAttribute("title", "Öffnet diesen Eintrag für die Bearbeitung");
    button.setAttribute("onclick", "setInsertMode(\"edit\")");
    button.addEventListener("click", function () { editSteps(id) });


    return button;
}

function editSteps(id) {
    setIdOfEntryToEdit(id);
    fillEditFields(getPermissionViaId(id));
}

function getPermissionViaId(id) {

    let doc = "";
    allPermissions.forEach(permission => {
        if (permission._id === id) {
            doc = permission;
            return;
        }
    });

    return doc
}

function getParkingLotsToEnableCheckboxes(parkingLots) {

    parkingLots = parkingLots.trim().split("-")

    let parkingLotsToCheck = [];

    for (let index = 0; index < parkingPlaces.length; index++) {
        if (parkingLots.includes(parkingPlaces[index])) {
            parkingLotsToCheck.push(parkingPlaces[index])
        }
    }
    return parkingLotsToCheck;
}

function fillEditFields(doc) {

    setInputFieldText("kennzeichen", doc["kennzeichen"]);
    setInputFieldText("land", doc["land"]);
    setInputFieldText("bemerkung", doc["bemerkung"]);
    setInputFieldText("nachname", doc["nachname"]);
    setInputFieldText("vorname", doc["vorname"]);
    setInputFieldText("fahrzeug", doc["fahrzeug"]);
    setInputFieldText("farbe", doc["farbe"]);
    setInputFieldText("unternehmen", doc["unternehmen"]);
    setInputFieldText("bereich", doc["bereich"]);
    setInputFieldText("telefon", doc["telefon"]);

    uncheckAllParkingPlacesCheckboxes();
    editParkingPlacesCheckboxes(
        true,
        getParkingLotsToEnableCheckboxes(
            doc["parkplaetze"])
    );

}

function editParkingPlacesCheckboxes(checkBoxState, parkingPlaces) {

    let parkingLotsCheckBoxes = document.getElementsByClassName("parking-lot");

    for (let parkingLotIndex = 0; parkingLotIndex < parkingLotsCheckBoxes.length; parkingLotIndex++) {

        let parkingLot = parkingLotsCheckBoxes[parkingLotIndex];

        if (parkingPlaces.includes(getParkingLotNameForEdit(parkingLot))) {
            parkingLot.checked = checkBoxState;
        }
    }
}
// TODO: Zusammenführen mit Create
// TODO: alle document. * in die dom utils
function getParkingLotNameForEdit(parkingLot) {
    return parkingLot.parentNode.parentNode.getElementsByTagName("span")[0].textContent;
}