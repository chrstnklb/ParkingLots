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

module.exports.search = async function () {

    const first = await getDbConnection().allDocs({ include_docs: true, 'endkey': '_design' })
        .then(function (result) { return result.rows; })
        .catch(function (err) { console.log(err); return err; });

    const second = await getDbConnection().allDocs({ include_docs: true, 'startkey': '_design\uffff' })
        .then(function (result) { return result.rows; })
        .catch(function (err) { console.log(err); return err; });

    const all = first.concat(second);

    return all;
};

module.exports.findByKennzeichen = function (kennzeichen) {

    getDbConnection().createIndex({ index: { fields: ['kennzeichen'] } })

    return getDbConnection().find({
        selector: { kennzeichen: kennzeichen }, fields: ["parkplaetze"]
    }).then(function (result) {
        return result.docs[0].parkplaetze;
    }).catch(function (err) { console.log(err); return "Kennzeichen unbekannt!"; });
}

// In testing it became clear, that even though the usage of async/await, the database seems to have its own internal queue.
// Therefore, the database we have to give the database more time to process the data.      
async function waitForDatabase() {
    await new Promise((r) => setTimeout(r, 1000));
}

async function getCount() {
    await waitForDatabase();
    return getDbConnection().allDocs()
        .then(function (result) { return result.rows.length; })
        .catch(function (err) { console.log(err); return err; });
};

module.exports.getCount = getCount;

module.exports.create = function (parkerlaubnis) {
    let filledParkerlaubnis = dbUtils.fillUpFieldsForParkerlaubnis(parkerlaubnis);

    return getDbConnection().put(filledParkerlaubnis)
        .then(function (result) { return result; })
        .catch(function (err) { console.log(err); return err; });
};

module.exports.getErlaubnis = function (id) {
    return getDbConnection().get(id)
        .then(function (doc) { return doc; })
        .catch(function (err) { return err; });
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

function remove(parkerlaubnis) {

    return connection.get(parkerlaubnis)

        .then(function (doc) {
            return getDbConnection().remove(doc);
        })

        .then(function (result) {
            return result;
        })

        .catch(function (err) {
            console.log(err);
            return err;

        });
};


module.exports.deleteAll = async function () {

    return getDbConnection().allDocs({ include_docs: true })

        .then(function (allDocs) {
            allDocs.rows.forEach((row) => { remove(row.id); });
        })

        .then(function () {
            return getCount()
        })

        .then(function (count) {
            return count === 0
        })

        .catch(function (err) { console.log(err); return err; })
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

module.exports.remove = remove;