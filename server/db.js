const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

const { dbUrl, folderIncoming } = require("../config.js");
var excel = require("./excel");

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

module.exports.edit = function (idToBeUpdated, parkerlaubnis) {
  return connection
    .get(idToBeUpdated)
    .then(function (doc) {
      (doc._id = idToBeUpdated),
        (doc.letzteAenderung = parkerlaubnis.letzteAenderung),
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

// module.exports.uploadXlsx = function (files) {

//   if (req.files) {
//     const file = req.files.fileUploaded;
//     const filePath = folderIncoming + file.name;

//     file.mv(`${filePath}`, (err) => {
//       let count = getMaxId();

//       if (err) {
//         console.log(err);
//         res.send("There is error");
//       } else {
//         let rows = excel.writeExcelEntriesToDatabase(`${filePath}`);
//         let parkerlaubnisArray = [];
//         let letzteAenderung = new Date(Date.now()).toLocaleDateString();
//         rows.forEach((row) => {
//           parkerlaubnisArray.push({
//             _id: (count++).toString(),

//             letzteAenderung: letzteAenderung,

//             nachname: row.Nachname,
//             vorname: row.Vorname,
//             unternehmen: row.Unternehmen,
//             bereich: row.Bereich,
//             telefon: row.Telefon,
//             kennzeichen: row.Kennzeichen,
//             land: row.Land,
//             fahrzeug: row.Fahrzeug,
//             farbe: row.Farbe,
//             bemerkung: row.Bemerkung,
//             parkplaetze: row.Parkplaetze,

//             searchHash:
//               row.Nachname +
//               row.Vorname +
//               row.Unternehmen +
//               row.Bereich +
//               row.Telefon +
//               row.Kennzeichen +
//               row.Land +
//               row.Fahrzeug +
//               row.Farbe +
//               row.Bemerkung +
//               row.Parkplaetze,
//           });
//         });

//         db.bulkDocs(parkerlaubnisArray, function (err) {
//           if (err) return console.log(err);
//         })
//           .then(() => {
//             res.redirect("/");
//           })
//           .catch(function (err) {
//             console.log(err);
//           });
//       }
//     });
//   } else {
//     res.send("There are no files");
//   }
// };
