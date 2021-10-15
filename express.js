//#region express config

const express = require('express')
const expressApp = express()
const expressAppPort = 3000;

expressApp.use(express.static("views"))
expressApp.set('view engine', 'ejs');

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

expressApp.get('/', (req, res) => {

  db.allDocs({
    include_docs: true

  }).then(function (result) {
    res.render('index', { table: result, total_rows: result.total_rows });

  }).catch(function (err) {
    console.log(err);
  });

})

expressApp.listen(expressAppPort, () => {
  console.log("Server Started at http://localhost:" + expressAppPort)
})

expressApp.post('/clicked', (req, res) => {
  const click = { clickTime: new Date() };
  console.log(click);
  let element = {

    _id: Date.now().toString(),

    name: 'Name',
    vorname: 'Vorname',
    unternehmen: 'Unternehmen',
    bereich: 'Bereich',
    telefon: 'Telefon',
    kennzeichen: 'Kennzeichen',
    land: 'Land',
    fahrzeug: 'Fahrzeug',
    farbe: 'Farbe',
    bemerkung: 'Bemerkung',
    parkplaetze:'P1, P2, P3, P3 Erw, P4, P5, P6, A75, Job Ticket, Werk'
  }

  db.put(element, function (err, response) {
    console.log('createElement');
    if (err) {
      return console.log(err);
    } else {
      console.log(response);
      wasSaved = true;
    }

    console.log('click added to db');
  }).then(function (result) {
    res.sendStatus(200);
    // res.end();
    console.log("response??? it was saved");
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