//#region express setup and config

//#region express config

const { table } = require('console');
const exp = require('constants');
const express = require('express');
const expressApp = express();
const expressAppPort = 3000;

expressApp.use(express.static("views"));
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.set('view engine', 'ejs');
expressApp.set('views', ['views', 'views/table']);

//#endregion

//#region database config

var PouchDB = require('pouchdb');

const dbUser = "adminuwe"
const dbPassword = "adminuwe"
const dbIpAddress = "localhost"
const dbPort = "5984"
const dbTableName = "erlaubnisse"

const db = new PouchDB('http://' + dbUser + ':' + dbPassword + '@' + dbIpAddress + ':' + dbPort + '/' + dbTableName);

//#endregion

//#endregion

expressApp.get('/', function (req, res, next) {
  res.render('../views/main/index');
  next()
})

expressApp.get('/search', (req, res) => {
  console.log("coming from /search");
  db.allDocs({
    include_docs: true

  }).then(function (result) {
    res.json(result.rows);

  }).catch(function (err) {
    console.log(err);
  });

})

expressApp.listen(expressAppPort, () => {
  console.log("Server Started at http://localhost:" + expressAppPort)
})

expressApp.post('/create', function (req, res) {

  console.log('req.body.parkerlaubnis :>> ', req.body.parkerlaubnis);

  db.put(req.body.parkerlaubnis, function (err, response) {
    if (err) {
      return console.log(err);
    } else {
      console.log(response);
    }

  }).then(function (result) {
    res.sendStatus(200);

  }).catch(function (err) {
    console.log(err);
  });
})

expressApp.post('/edit', function (req, res) {

  let idToBeUpdated = req.body.parkerlaubnis._id;

  db.get(idToBeUpdated).then(function(doc){

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


//#region examples for later

expressApp.get('/DownloadP1', (req, res) => {
  res.download("express.js")
})

expressApp.get('/ErrorInBrowserConsole', (req, res) => {
  res.status(500).send('ERROR : Look at the browser console!')
  res.status(500).json({ message: 'ERROR : Look at the browser console!' });
})

//#endregion