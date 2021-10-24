function savePermission() {

    // console.log('savePermission button was clicked');
    let date = Date.now();

    fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            parkerlaubnis: {

                _id: date.toString(),

                letzteAenderung: (new Date(date)).toLocaleDateString(),

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
                parkplaetze: getInputValuesForParkingLotsAsString()
            }
        })

    }).then(function (response) {
        if (response.ok) {
            runStepsForSuccessfulPermissionCreation();
            return;
        } else
            throw new Error('Request failed.');

    }).catch(function (error) {
        console.log(error);
    });
};