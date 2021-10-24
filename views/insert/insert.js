function setInsertMode(mode) {
    insertMode = mode;
}

function insertPermission() {
    console.log('insertMode :>> ', insertMode);

    switch (insertMode) {

        case "create":
            console.log("create");
            saveNewPermission();
            break;

        case "edit":
            console.log("edit");
            saveEditedPermission();
            break;

        default:
            console.log("mode not supported");
            break;
    }
}

function runStepsForSuccessfulPermissionSaving() {
    showSuccessMessage(getVorname(), getNachname());
    refreshPage();
}

function showSuccessMessage(vorname, nachname) {
    alert('\nParkerlaubnis für \n' + vorname + ' ' + nachname + '\nwurde ERFOLGREICH gespeichert!');
}