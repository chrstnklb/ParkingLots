var excel = require("../excel.js");

const dbUtils = require("./db-utils.js");
const time = require("../util/time.js");


module.exports.getParkerlaubnisAsArray = function (filePath) {
    let count = getMaxId();
    let rows = excel.writeExcelEntriesToDatabase(`${filePath}`);
    let parkerlaubnisArray = [];
    let letzteAenderung = time.createLetzteAenderung();
    rows.forEach((row) => {
        parkerlaubnisArray.push({
            _id: (count++).toString(),

            letzteAenderung: letzteAenderung,

            nachname: row.Nachname,
            vorname: row.Vorname,
            unternehmen: row.Unternehmen,
            bereich: row.Bereich,
            telefon: row.Telefon,
            kennzeichen: row.Kennzeichen,
            land: row.Land,
            fahrzeug: row.Fahrzeug,
            farbe: row.Farbe,
            bemerkung: row.Bemerkung,
            parkplaetze: row.Parkplaetze,

            searchHash:
                row.Nachname +
                row.Vorname +
                row.Unternehmen +
                row.Bereich +
                row.Telefon +
                row.Kennzeichen +
                row.Land +
                row.Fahrzeug +
                row.Farbe +
                row.Bemerkung +
                row.Parkplaetze,
        });
    });
    return parkerlaubnisArray;
}

module.exports.fillUpFieldsForParkerlaubnis = function (parkerlaubnis) {
    let entry = parkerlaubnis;
    entry._id = dbUtils.getNewId();
    entry.letzteAenderung = time.createLetzteAenderung();
    entry.searchHash = dbUtils.getSearchHash(parkerlaubnis);
    return entry;
}

module.exports.getSearchHash = function (parkerlaubnis) {
    return (parkerlaubnis.searchHash =
        parkerlaubnis.nachname +
        parkerlaubnis.vorname +
        parkerlaubnis.unternehmen +
        parkerlaubnis.bereich +
        parkerlaubnis.telefon +
        parkerlaubnis.kennzeichen +
        parkerlaubnis.land +
        parkerlaubnis.fahrzeug +
        parkerlaubnis.farbe +
        parkerlaubnis.bemerkung +
        parkerlaubnis.parkplaetze);
}

function getTodayAsMs() {
    return Date.now().toString();
}

module.exports.generateUniqueId = function () {
    return getTodayAsMs()
}

function getMaxId() {
    let count = Date.now();
    getDbConnection().allDocs({ include_docs: true })
        .then(function (result) {
            if (result.total_rows === 0) {
                count = Date.now();
            } else {
                let allIds = [result.total_rows];
                result.rows.forEach((doc) => {
                    allIds.push(parseInt(doc.id));
                });
                count = Math.max(...allIds);
            }
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });

    return count;
}

module.exports.getNewId = function () {
    return Date.now().toString()
}