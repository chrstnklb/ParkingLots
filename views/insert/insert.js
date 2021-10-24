function setInsertMode(mode) {
    insertMode = mode;
}

function insertPermission() {

    let fetchMode;
    let id;

    switch (insertMode) {

        case "create":
            fetchMode = '/create';
            id = Date.now().toString()
            break;

        case "edit":
            fetchMode = '/edit';
            id = ID_OF_ACTUAL_ENTRY
            break;
        default:
            console.log("insertMode not supported");
            break;
    }

    fetch(fetchMode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            parkerlaubnis: {

                _id: id,

                letzteAenderung: (new Date(Date.now())).toLocaleDateString(),

                nachname: getInputValueViaId("nachname"),
                vorname: getInputValueViaId("vorname"),
                unternehmen: getInputValueViaId("unternehmen"),
                bereich: getInputValueViaId("bereich"),
                telefon: getInputValueViaId("telefon"),
                kennzeichen: getInputValueViaId("kennzeichen"),
                land: getInputValueViaId("land"),
                fahrzeug: getInputValueViaId("fahrzeug"),
                farbe: getInputValueViaId("farbe"),
                bemerkung: getInputValueViaId("bemerkung"),
                parkplaetze: getInputValuesForParkingLotsAsString()
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

function runStepsForSuccessfulPermissionSaving() {
    showSuccessMessage(getVorname(), getNachname());
    refreshPage();
}

function showSuccessMessage(vorname, nachname) {
    alert('\nParkerlaubnis für \n' + vorname + ' ' + nachname + '\nwurde ERFOLGREICH gespeichert!');
}