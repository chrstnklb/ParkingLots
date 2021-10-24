// function deleteInputFieldsTexts() {
//     setInputFieldText("kennzeichen");
//     setInputFieldText("land", "DEU");
//     setInputFieldText("bemerkung");
//     setInputFieldText("nachname");
//     setInputFieldText("vorname");
//     setInputFieldText("fahrzeug");
//     setInputFieldText("farbe");
//     setInputFieldText("unternehmen");
//     setInputFieldText("bereich");
//     setInputFieldText("telefon");
//     uncheckAllParkingPlacesCheckboxes();
//     // console.log("Input fields from modal successfully cleared!");
// }

// function grabInputFieldsForErlaubnis(isEditMode) {
//     return {
//         _id: isEditMode ? keyOfActualEntryLoadedToEdit : String(getNewId()),

//         timestamp: Date.now().toString(),

//         name: getInputValue("nachname"),
//         vorname: getInputValue("vorname"),
//         unternehmen: getInputValue("unternehmen"),
//         bereich: getInputValue("bereich"),
//         telefon: getInputValue("telefon"),
//         kennzeichen: getInputValue("kennzeichen"),
//         land: getInputValue("land"),
//         fahrzeug: getInputValue("fahrzeug"),
//         farbe: getInputValue("farbe"),
//         bemerkung: getInputValue("bemerkung"),
//         parkplaetze: getInputValuesForParkingLotsAsString()
//     }
// }

function setKennzeichenFromSearchText() {
    setInputFieldText("kennzeichen", getSearchTexts().join(" "));
}

function getVorname() {
    return getInputValueViaId("vorname");
}

function getNachname() {
    return getInputValueViaId("nachname");
}