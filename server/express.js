var excel = require("./excel");

//#region express setup and config [ rgba(255, 99, 71, 0.5) ]

//#region [ rgba(255, 99, 71, 0.1) ] express config

const express = require('express');
const fileUpload = require('express-fileupload');

const expressApp = express();
const expressAppPort = 3000;

expressApp.use(express.static("views"));
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(fileUpload());

expressApp.set('view engine', 'ejs');
expressApp.set('views', ['views', 'views/table']);

//#endregion

//#region [rgba(120,120,120,0.1)] database config

var PouchDB = require('pouchdb');
const res = require("express/lib/response");

const dbUser = "adminuwe"
const dbPassword = "adminuwe"
const dbIpAddress = "localhost"
const dbPort = "5984"
const dbTableName = "erlaubnisse"

const db = new PouchDB('http://' + dbUser + ':' + dbPassword + '@' + dbIpAddress + ':' + dbPort + '/' + dbTableName);

//#endregion

//#endregion

//#region [ rgba(0, 255, 0, 0.2) ] express communication with client

expressApp.get('/', function (req, res, next) {
  console.log("/");
  res.render('../views/main/index');
  next()
})

expressApp.get('/search', (req, res) => {
  console.log("/search");

  console.log("/search Start: " + (new Date(Date.now())).toLocaleTimeString());

  db.allDocs({
    include_docs: true,
    limit: 50

  }).then(function (result) {

    console.log("/search Ende: " + (new Date(Date.now())).toLocaleTimeString());
    res.json(result.rows);

  }).catch(function (err) {
    console.log(err);
  });

})

expressApp.listen(expressAppPort, () => {
  console.log("Server Started at http://localhost:" + expressAppPort)
})

expressApp.post('/create', function (req, res) {
  console.log("/create");
  // console.log('req.body.parkerlaubnis :>> ', req.body.parkerlaubnis);

  db.put(req.body.parkerlaubnis, function (err, response) {
    if (err) {
      return console.log(err);
    } else {
      // console.log(response);
    }

  }).then(function (result) {
    res.sendStatus(200);

  }).catch(function (err) {
    console.log(err);
  });
})

expressApp.post('/edit', function (req, res) {

  console.log("/edit");

  let idToBeUpdated = req.body.parkerlaubnis._id;
  console.log('idToBeUpdated :>> ', idToBeUpdated);

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
      doc.parkplaetze = req.body.parkerlaubnis.parkplaetze

    return db.put(doc);

  }).then(() => {
    res.sendStatus(200);

  }).catch(function (err) {
    console.log(err);
  });
})

expressApp.post('/delete', function (req, res) {
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

//#endregion

// setTimeout(function () {

//   alert('hello');
// }, 2);

// let lastId = Date.now().toString();

// function calculateIdFromTime() {
//   let now = Date.now().toString()
//   while (!(now > lastId)) {
//     // do nothing but wait
//     now = Date.now().toString()
//   }
//   lastId = now;
//   return now;
// }

expressApp.post('/upload', (req, res, next) => {
  console.log("/upload Start: " + (new Date(Date.now())).toLocaleTimeString());

  console.log("/upload");

  if (req.files) {
    const file = req.files.fileUploaded
    const fileName = file.name
    console.log('fileName :>> ', fileName);

    file.mv(`././server/incoming-files/${fileName}`, err => {
      // TODO: error, wenn nicht xlsx

      let count = getMaxId();

      if (err) { console.log(err); res.send('There is error'); }
      else {

        let rows = excel.writeExcelEntriesToDatabase(`././server/incoming-files/${fileName}`);
        let parkerlaubnisArray = [];

        rows.forEach(row => {

          parkerlaubnisArray.push(
            {
              "_id": (count++).toString(),

              "letzteAenderung": (new Date(Date.now())).toLocaleDateString(),

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
              "parkplaetze": row.Parkplaetze
            }
          )
        })

        db.bulkDocs(parkerlaubnisArray, function (err, response) {

          if (err) { return console.log(err); }
          else {
            // console.log(response);
          }

        }).then(function (result) {
          console.log("/bulkDocs Ende: " + (new Date(Date.now())).toLocaleTimeString());
          res.redirect('/');
          // res.sendStatus(200);
        }).catch(function (err) {
          console.log(err);
        });

      }
    })
  } else {
    res.send('There are no files')
  }
  console.log("/upload Ende: " + (new Date(Date.now())).toLocaleTimeString());

});

function getMaxId() {

  console.log("/getMaxId Start: " + (new Date(Date.now())).toLocaleTimeString());

  let count = Date.now();
  db.allDocs({ include_docs: true }).then(function (result) {

    if (result.total_rows === 0) {
      console.log("zero");
      count = Date.now();
    } else {
      let allIds = [result.total_rows];
      result.rows.forEach(doc => { allIds.push(parseInt(doc.id)) })
      count = Math.max(...allIds)
    }
  }).catch(function (err) { console.log(err); });

  console.log("/getMaxId Ende: " + (new Date(Date.now())).toLocaleTimeString());

  return count
}

// For savety in excel imports we want to know the smallest id and from there we gow lower in createing new id's in every excel import.
// function getLowestId() {

//   // TODO: Methode auch in search etc nutzuen
//   db.allDocs({
//     include_docs: true

//   }).then(function (result) {

//     // console.log('allDocs :>> ', result);

//     let allIds = [result.length];
//     console.log('allIds :>> ', allIds);

//     // allDocs.rows.forEach(doc => {
//     //   allIds.push(parseInt(doc._id))
//     // })

//     const min = Math.min(...allIds)

//     console.log('min :>> ', min);

//   }).catch(function (err) {
//     console.log(err);
//   });
// }

//#region [rgba(120, 120, 120, 0.2) ] examples for later

expressApp.get('/DownloadP1', (req, res) => {
  res.download("express.js")
})

expressApp.get('/ErrorInBrowserConsole', (req, res) => {
  res.status(500).send('ERROR : Look at the browser console!')
  res.status(500).json({ message: 'ERROR : Look at the browser console!' });
})

//#endregion