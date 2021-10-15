let wasSaved = false;

function loginfunction() {
    window.alert("Login functionality is under development.");
}

const savePermissionButton = document.getElementById('savePermission');
savePermissionButton.addEventListener('click', function (e) {

    console.log('savePermission button was clicked');

    fetch('/clicked', { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                console.log('savePermission click was recorded');
                console.log('Click was recorded');
                return;
            } else
                throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
});

// export function doSave(){
//     console.log('savePermission button was clicked');
// }

// function hideModalWithAlert() {
//     $('#staticBackdrop').modal('hide');
// }

// $(document).ready(function () {

//     $('#exampleModal').on('hidden.bs.modal', function () {
//         alert("Parkerlaubnis wurde " + (wasSaved ? "erfolgreich" : "NICHT") + " gespeichert!");
//         wasSaved = false;
//     })


//     $('#exampleModal').on('show.bs.modal', function (e) {

//         setKennzeichenFromSearchText();

//         e.relatedTarget.className.includes("editButton");
//         document.getElementById("savePermission").removeEventListener("click", updatePermission);
//         document.getElementById("savePermission").removeEventListener("click", createElementFromUi);

//         if (e.relatedTarget.className.includes("editButton")) {
//             document
//                 .getElementById("savePermission")
//                 .addEventListener("click", updatePermission);
//         } else { // createMode
//             document
//                 .getElementById("savePermission")
//                 .addEventListener("click", createElementFromUi);
//         }
//     })

// });

function updatePermission() {
    updateElement(grabInputFieldsForErlaubnis(true));
}

function createElementFromUi() {
    createElementViaUi(grabInputFieldsForErlaubnis(false))
}

function setKennzeichenFromSearchText() {
    setInputFieldText("kennzeichen", getSearchTexts().join(" "));
}

function doCancel() {
    // deleteInputFieldsTexts();
    // hideModalWithAlert();
    $('#exampleModal').modal('hide');
}

function setInputFieldText(id, isNewText) {
    getElementById(id).value = isNewText ? isNewText : "";
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

function deleteInputFieldsTexts() {
    setInputFieldText("kennzeichen");
    setInputFieldText("land", "DEU");
    setInputFieldText("bemerkung");
    setInputFieldText("nachname");
    setInputFieldText("vorname");
    setInputFieldText("fahrzeug");
    setInputFieldText("farbe");
    setInputFieldText("unternehmen");
    setInputFieldText("bereich");
    setInputFieldText("telefon");
    editParkingPlacesCheckboxes(false, parkingPlaces);
}

function isChecked(parkingLot) {
    return parkingLot.checked;
}

function getParkingLotName(parkingLot) {
    return parkingLot
        .parentNode
        .getElementsByTagName("label")[0]
        .getElementsByTagName("h5")[0]
        .textContent;
}

function getInputValuesForParkingLots() {
    let parkingLots = document.getElementsByClassName("parking-lot");
    let parkingLotsValues = "";

    for (let parkingLotIndex = 0; parkingLotIndex < parkingLots.length; parkingLotIndex++) {

        let parkingLot = parkingLots[parkingLotIndex]

        if (isChecked(parkingLot)) {
            parkingLotsValues += getParkingLotName(parkingLot) + " ";
        }

    }
    return parkingLotsValues;
}

function grabInputFieldsForErlaubnis(isEditMode) {
    return {
        _id: isEditMode ? keyOfActualEntryLoadedToEdit : String(getNewId()),

        timestamp: Date.now().toString(),

        name: getInputValue("nachname"),
        vorname: getInputValue("vorname"),
        unternehmen: getInputValue("unternehmen"),
        bereich: getInputValue("bereich"),
        telefon: getInputValue("telefon"),
        kennzeichen: getInputValue("kennzeichen"),
        land: getInputValue("land"),
        fahrzeug: getInputValue("fahrzeug"),
        farbe: getInputValue("farbe"),
        bemerkung: getInputValue("bemerkung"),
        parkplaetze: getInputValuesForParkingLots()
    }
}

function getValueOfElement(inputValue) {
    if (inputValue === null) {
        inputValue = "";
    }
    return inputValue.value;
}

function getElementById(id) {
    return document.getElementById(id);
}

function getInputValue(id) {
    let input = getElementById(id);
    return getValueOfElement(input);
}
