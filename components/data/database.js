//     // old local db connection, necessary for migration from old to new in next release
//     // let db = new PouchDB('parkplaetze');
var PouchDB = require('pouchdb');

const db = new PouchDB('http://localhost:3000/parkplaetze');

function createDataBase() {
    // old local db connection, necessary for migration from old to new in next release
    // db = new PouchDB('parkplaetze');
    db = new PouchDB('http://localhost:3000/parkplaetze');
    console.log("Database created Successfully.");
}

function deleteDataBase() {

    db.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Database Deleted");
            deleteAllPermissionsArray();
            alert("Database Deleted");
        }
    });
}

function loadDbToHtmlTable() {
    // connectToDatabase()
    db.allDocs({
        include_docs: true
    }).then(function(result) {
        setAllPermissionsArray(result.rows);
        setFilteredPermissions(allPermissionsArray);
        searchAndShowPermissions();
        loadThemeStyleOnLoad();
    }).catch(function(err) {
        console.log(err);
    });
}

function loadDbToPermissionsArray() {
    db.allDocs({
        include_docs: true
    }).then(function(result) {
        setAllPermissionsArray(result.rows);
        searchAndShowPermissions();
    }).catch(function(err) {
        console.log(err);
    });
}

function createElement(element) {
    db.put(element, function(err, response) {
        console.log(createElement);
        if (err) {
            return console.log(err);
        } else {
            console.log(response);
            wasSaved = true;
        }
    });
}

function closeModalAfterSuccessfullySaved() {
    wasSaved = true;
    deleteInputFieldsTexts();
    hideModalWithAlert();
}

function deleteModalAfterSuccessfullySaved() {
    wasDeleted = true;
    deleteInputFieldsTexts();
    hideDeleteModalWithAlert();
}

function createElementViaUi(element) {
    db.put(element, function(err) {
        if (err) {
            return console.log(err)
        } else {
            closeModalAfterSuccessfullySaved()
            setSearchFieldText(element["kennzeichen"])
            loadDbToPermissionsArray()
            console.log("element created")
        }
    });
}

function readElement(elementId) {
    db.get(elementId, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            fillEditFields(doc);
        }
    });
}

function updateElement(element) {
    db.get(element._id).then(function(doc) {
        // update their agedoc.
        doc._id = element._id;
        doc.timestamp = Date.now().toString();
        doc.name = element.name;
        doc.vorname = element.vorname;
        doc.unternehmen = element.unternehmen;
        doc.bereich = element.bereich;
        doc.telefon = element.telefon;
        doc.kennzeichen = element.kennzeichen;
        doc.land = element.land;
        doc.fahrzeug = element.fahrzeug;
        doc.farbe = element.farbe;
        doc.bemerkung = element.bemerkung;
        doc.parkplaetze = element.parkplaetze;

        console.log("Document created Successfully");

        // put them back
        return db.put(doc);
    }).then(function() {
        closeModalAfterSuccessfullySaved();
        setSearchFieldText(element["kennzeichen"]);
        loadDbToPermissionsArray();

        // fetch data again
        return db.get(element._id);
    }).then(function(doc) {
        console.log(doc);
    });
}

function deleteElementFromDb(elementId) {
    db.get(elementId).then(function(doc) {
        return db.remove(doc._id, doc._rev);
    }).then(function(err, info) {

        deleteModalAfterSuccessfullySaved();
        setSearchFieldText("");
        loadDbToPermissionsArray();
        searchAndShowPermissions();
        setFocusToSearchField();

        if (err) { // alway delivers err = true, even though it works correct...
            console.log(err)
        } else {
            console.log("info", info);
        }
    });
}