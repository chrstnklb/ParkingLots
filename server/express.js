const { folderIncoming, folderOutgoing, appPort, appUrl, dbUrl } = require('../config.js');
var excel = require("./excel");
var csv = require("./csv");

//#region [ rgba(255, 99, 71, 0.05) ] express config

const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', ['views', 'views/table']);

//#endregion

//#region [rgba(120,120,120,0.05)] database config

var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB(dbUrl);

//#endregion

//#region [ rgba(0, 255, 0, 0.05) ] express communication with client

app.get('/', function (req, res, next) {
  console.log("/");
  res.render('../views/main/index');
  next()
})

app.get('/search', (req, res) => {
  console.log("/search");

  db.allDocs({
    include_docs: true

  }).then(function (result) {

    res.json(result.rows);

  }).catch(function (err) {
    console.log(err);
  });

})

app.listen(appPort, () => {
  console.log(`Server Started at ${appUrl}`)
})

app.post('/create', function (req, res) {
  console.log("/create");

  db.put(req.body.parkerlaubnis, function (err) {
    if (err) {
      return console.log(err);
    }

  }).then(() => {
    res.sendStatus(200);

  }).catch(function (err) {
    console.log(err);
  });
})

app.post('/edit', function (req, res) {

  console.log("/edit");

  let idToBeUpdated = req.body.parkerlaubnis._id;

  db.get(idToBeUpdated).then(function (doc) {

    doc._id = idToBeUpdated,

      doc.letzteAenderung = req.body.parkerlaubnis.letzteAenderung,

      doc.nachname = req.body.parkerlaubnis.nachname,
      doc.vorname = req.body.parkerlaubnis.vorname,
      doc.unternehmen = req.body.parkerlaubnis.unternehmen,
      doc.bereich = req.body.parkerlaubnis.bereich,
      doc.telefon = req.body.parkerlaubnis.telefon,
      doc.kennzeichen = req.body.parkerlaubnis.kennzeichen,
      doc.land = req.body.parkerlaubnis.land,
      doc.fahrzeug = req.body.parkerlaubnis.fahrzeug,
      doc.farbe = req.body.parkerlaubnis.farbe,
      doc.bemerkung = req.body.parkerlaubnis.bemerkung,
      doc.parkplaetze = req.body.parkerlaubnis.parkplaetze,

      doc.searchHash = req.body.parkerlaubnis.searchHash

    return db.put(doc);

  }).then(() => {
    res.sendStatus(200);

  }).catch(function (err) {
    console.log(err);
  });
})

app.post('/delete', function (req, res) {
  let idToBeDeleted = req.body._id;

  db.get(idToBeDeleted, () => {

  }).then(function (doc) {
    return db.remove(doc);

  }).then(() => {
    res.sendStatus(200);

  }).catch(function (err) {
    console.log(err);
  });

})

app.post('/upload', (req, res) => {
  console.log("/upload");

  if (req.files) {
    const file = req.files.fileUploaded
    const filePath = folderIncoming + file.name

    file.mv(`${filePath}`, err => {

      let count = getMaxId();

      if (err) { console.log(err); res.send('There is error'); }
      else {

        let rows = excel.writeExcelEntriesToDatabase(`${filePath}`);
        let parkerlaubnisArray = [];
        let letzteAenderung = (new Date(Date.now())).toLocaleDateString();
        rows.forEach(row => {

          parkerlaubnisArray.push(
            {
              "_id": (count++).toString(),

              "letzteAenderung": letzteAenderung,

              "nachname": row.Nachname,
              "vorname": row.Vorname,
              "unternehmen": row.Unternehmen,
              "bereich": row.Bereich,
              "telefon": row.Telefon,
              "kennzeichen": row.Kennzeichen,
              "land": row.Land,
              "fahrzeug": row.Fahrzeug,
              "farbe": row.Farbe,
              "bemerkung": row.Bemerkung,
              "parkplaetze": row.Parkplaetze,

              "searchHash":
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
                row.Parkplaetze
            }
          )
        })

        db.bulkDocs(parkerlaubnisArray, function (err) {

          if (err) return console.log(err);

        }).then(() => {

          res.redirect('/');

        }).catch(function (err) {

          console.log(err);

        });

      }
    })
  } else { res.send('There are no files') }

});

function getMaxId() {

  let count = Date.now();
  db.allDocs({ include_docs: true }).then(function (result) {

    if (result.total_rows === 0) {
      count = Date.now();
    } else {
      let allIds = [result.total_rows];
      result.rows.forEach(doc => { allIds.push(parseInt(doc.id)) })
      count = Math.max(...allIds)
    }
  }).catch(function (err) { console.log(err); });

  return count
}

app.get('/downloadDbAsXlsx', (req, res) => {

  const timestamp = "_" + (new Date(Date.now())).toLocaleDateString() + "_" + Date.now();
  const folder = folderOutgoing
  const filePath = folder + "erlaubnisse" + timestamp + ".xlsx";

  let data = [];

  db.allDocs({ include_docs: true }).then(function (result) {

    result.rows.forEach(row => {

      data.push(
        {
          "Nachname": row.doc.nachname,
          "Vorname": row.doc.vorname,
          "Unternehmen": row.doc.unternehmen,
          "Bereich": row.doc.bereich,
          "Telefon": row.doc.telefon,
          "Kennzeichen": row.doc.kennzeichen,
          "Land": row.doc.land,
          "Fahrzeug": row.doc.fahrzeug,
          "Farbe": row.doc.farbe,
          "Bemerkung": row.doc.bemerkung,
          "Parkplaetze": row.doc.parkplaetze
          // explicit: no searchHash as download
        }
      )
    })

  }).then(() => {

    excel.writeExcelEntriesFromDatabase(data, filePath);

  }).then(() => {

    res.download(filePath)

  }).catch(function (err) { console.log(err); });

})

app.get('/download/:id', function (req, res) {
  console.log("/download/" + req.params.id);

  let parkingLot = req.params.id;
  let fileName = csv.generateFileName(parkingLot);

  db.createIndex({
    index: { fields: ['nachname', 'vorname'] }

  }).then(() => {

    db.find({
      selector: { "parkplaetze": { "$regex": parkingLot } },
      fields: ["kennzeichen", "land", "nachname", "vorname"],
      sort: ["nachname", "vorname"]

    }).then((result) => {
      csv.writeCsvFile(fileName, result);

    }).then(() => {
      res.download(fileName)

    }).catch(function (err) { console.log(err); });
  }).catch(function (err) { console.log(err); });

});

//#endregion

// TODO: Express und DB trennen, allgemein modularer und diesselben Dinge wiederverwenden
// Suche auf 50 Treffer beschränken
// Dann aber muss auch jede Suche neu in DB suchen