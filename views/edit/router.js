function saveEditedPermission() {

    fetch('/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            parkerlaubnis: {
                // TODO: diese getInputs verallgemeinern mit denen von create
                _id: ID_OF_ACTUAL_ENTRY,

                letzteAenderung: (new Date(Date.now())).toLocaleDateString(),

                name: getInputValueViaId("nachname"),
                vorname: getInputValueViaId("vorname"),
                unternehmen: getInputValueViaId("unternehmen"),
                bereich: getInputValueViaId("bereich"),
                telefon: getInputValueViaId("telefon"),
                kennzeichen: getInputValueViaId("kennzeichen"),
                land: getInputValueViaId("land"),
                fahrzeug: getInputValueViaId("fahrzeug"),
                farbe: getInputValueViaId("farbe"),
                bemerkung: getInputValueViaId("bemerkung"),
                parkplaetze: getInputValuesForParkingLotsAsStringForEdit()
            }
        })

    }).then(function (response) {
        if (response.ok) {
            runStepsForSuccessfulPermissionSaving();
            return;
        } else
            throw new Error('Request failed.');

    }).catch(function (error) {
        console.log(error);
    });
};
// TODO diese und die nächste Funktion mit create erbinden
function getInputValuesForParkingLotsAsStringForEdit() {
    let parkingLotsValues = "";

    Array.prototype.forEach.call(getParkingLotsForEdit(), parkingLot => {
        if(parkingLot.checked) {
            parkingLotsValues += getParkingLotName(parkingLot) + " ";
        }
    });
    return parkingLotsValues;
}

function getParkingLotsForEdit() {
    let result = document.getElementsByClassName("parking-lot");
    console.log("result" + result.length);
    return document.getElementsByClassName("parking-lot");
}