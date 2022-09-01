// import bootstrap from 'bootstrap'
function generateEditButtons(id) {

    let button = document.createElement("button");
    button.setAttribute("id", "editButtonId" + id)
    button.setAttribute("class", "btn btn-success editButton opacity-75");

    
    button.setAttribute("type", "button");
    button.textContent = "✎"
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

    domSetInputFieldText("kennzeichen", doc["kennzeichen"]);
    domSetInputFieldText("land", doc["land"]);
    domSetInputFieldText("bemerkung", doc["bemerkung"]);
    domSetInputFieldText("nachname", doc["nachname"]);
    domSetInputFieldText("vorname", doc["vorname"]);
    domSetInputFieldText("fahrzeug", doc["fahrzeug"]);
    domSetInputFieldText("farbe", doc["farbe"]);
    domSetInputFieldText("unternehmen", doc["unternehmen"]);
    domSetInputFieldText("bereich", doc["bereich"]);
    domSetInputFieldText("telefon", doc["telefon"]);

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

        if (parkingPlaces.includes(getParkingLotName(parkingLot))) {
            parkingLot.checked = checkBoxState;
        }
    }
}