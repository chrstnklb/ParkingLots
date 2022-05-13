const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

const { dbUrl, folderIncoming } = require("../config.js");
var excel = require("./excel.js");
const time = require("./util/time.js");

let connection = new PouchDB(dbUrl);

// The one and only database connection
module.exports.getDbConnection = function () {
  if (connection === undefined) {
    connection = new PouchDB(dbUrl);
  }
  return connection;
};

module.exports.search = function () {
  return connection
    .allDocs({ include_docs: true })
    .then(function (result) {
      return result.rows;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
};

module.exports.add = function (parkerlaubnis) {
  ID_OF_ACTUAL_ENTRY = time.generateUniqueId();
  parkerlaubnis._id = ID_OF_ACTUAL_ENTRY;
  parkerlaubnis.letzteAenderung = time.createLetzteAenderung();
  return connection
    .put(parkerlaubnis)
    .then(() => {
      return 200;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
};

module.exports.getErlaubnis = function (id) {
  return connection
    .get(id)
    .then(function (doc) {
      return doc;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
};

module.exports.edit = function (idToBeUpdated, parkerlaubnis) {
  return connection
    .get(idToBeUpdated)
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
        (doc.searchHash = parkerlaubnis.searchHash);
      return connection.put(doc);
    })
    .then(() => {
      return 200;
    })
    .catch(function (err) {
      console.log(err);
    });
};

module.exports.delete = function (parkerlaubnis) {
  return connection
    .get(parkerlaubnis)
    .then(function (doc) {
      return connection.remove(doc);
    })
    .then(() => {
      return 200;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
};

function getMaxId() {
  let count = Date.now();
  connection
    .allDocs({ include_docs: true })
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

module.exports.uploadXlsx = function (files) {
  if (!files) console.log("There are no files!");

  const file = files.fileUploaded;
  const filePath = folderIncoming + file.name;
  let parkerlaubnisArray;
  let result;

  file.mv(`${filePath}`, (err) => {
    if (err) console.log("There is error!");

    parkerlaubnisArray = getParkerlaubnisArray(filePath);
    result = connection
      .bulkDocs(parkerlaubnisArray)
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

function getParkerlaubnisArray(filePath) {
  let count = getMaxId();
  let rows = excel.writeExcelEntriesToDatabase(`${filePath}`);
  let parkerlaubnisArray = [];
  let letzteAenderung = new Date(Date.now()).toLocaleDateString();
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
