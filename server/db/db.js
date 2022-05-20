const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

const { dbUrl, folderIncoming } = require("../../config.js");
const time = require("../util/time.js");
const dbUtils = require("./db-utils.js");

let connection;
getDbConnection();

// The one and only database connection
function getDbConnection() {
    if (connection === undefined || connection === null) {
        connection = new PouchDB(dbUrl);
    }
    return connection;
};

module.exports.search = function () {
    return getDbConnection()
        .allDocs({ include_docs: true })
        .then(function (result) {
            return result.rows;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
};

module.exports.create = function (parkerlaubnis) {
    let filledParkerlaubnis = dbUtils.fillUpFieldsForParkerlaubnis(parkerlaubnis);

    return getDbConnection().put(filledParkerlaubnis)
        .then(() => {
            return 200;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
};

module.exports.getErlaubnis = function (id) {
    return getDbConnection().get(id)
        .then(function (doc) {
            return doc;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
};

module.exports.edit = function (idToBeUpdated, parkerlaubnis) {
    return getDbConnection().get(idToBeUpdated)
        .then(function (doc) {
            (doc._id = idToBeUpdated),
                (doc.letzteAenderung = time.createLetzteAenderung()),
                (doc.nachname = parkerlaubnis.nachname),
                (doc.vorname = parkerlaubnis.vorname),
                (doc.unternehmen = parkerlaubnis.unternehmen),
                (doc.bereich = parkerlaubnis.bereich),
                (doc.telefon = parkerlaubnis.telefon),
                (doc.kennzeichen = parkerlaubnis.kennzeichen),
                (doc.land = parkerlaubnis.land),
                (doc.fahrzeug = parkerlaubnis.fahrzeug),
                (doc.farbe = parkerlaubnis.farbe),
                (doc.bemerkung = parkerlaubnis.bemerkung),
                (doc.parkplaetze = parkerlaubnis.parkplaetze),
                (doc.searchHash = dbUtils.getSearchHash(parkerlaubnis));
            return getDbConnection().put(doc);
        })
        .then(() => {
            return 200;
        })
        .catch(function (err) {
            console.log(err);
        });
};

module.exports.delete = function (parkerlaubnis) {
    return connection.get(parkerlaubnis)
        .then(function (doc) {
            return getDbConnection().remove(doc);
        })
        .then(() => {
            return 200;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
};

module.exports.deleteAll = function () {
    getDbConnection().allDocs({
        include_docs: true,
    }).then(function (result) {
        result.rows.forEach(function (doc) {
            getDbConnection().remove(doc.doc);
        });
    })
        .catch(function (err) {
            console.log(err);
        });
    return true;
};

module.exports.uploadXlsx = function (files) {
    if (!files) console.log("There are no files!");

    const file = files.fileUploaded;
    const filePath = folderIncoming + file.name;
    let parkerlaubnisArray;
    let result;

    file.mv(`${filePath}`, (err) => {
        if (err) console.log("There is error!");

        parkerlaubnisArray = dbUtils.getParkerlaubnAsArray(filePath);
        result = getDbConnection().bulkDocs(parkerlaubnisArray)
            .then((result) => {
                console.log("Documents inserted OK");
                return 200;
            })
            .catch(function (err) {
                console.log(err);
            });
    });
    return result;
};