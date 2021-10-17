//#region express config

const exp = require('constants');
const express = require('express');
const expressApp = express();
const expressAppPort = 3000;

expressApp.use(express.static("views"));
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
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
    res.render('index', { table: result.rows, total_rows: result.rows.length });

  }).catch(function (err) {
    console.log(err);
  });

})

expressApp.listen(expressAppPort, () => {
  console.log("Server Started at http://localhost:" + expressAppPort)
})

expressApp.post('/clicked', function (req, res) {

  console.log('req.body.parkerlaubnis :>> ', req.body.parkerlaubnis);

  db.put(req.body.parkerlaubnis, function (err, response) {
    if (err) {
      return console.log(err);
    } else {
      console.log(response);
    }

    // console.log('click added to db');
  }).then(function (result) {
    res.sendStatus(200);
    // console.log("response??? it was saved");
  }).catch(function (err) {
    console.log(err);
  });
})

expressApp.post('/searched', (req, res) => {
  db.allDocs({
    include_docs: true
  }).then(function (result) {

    let searchStr = req.body;
    console.log('searchStr :>> ', searchStr[0]);

    let searchResult = result;
    console.log('searchResult :>> ', searchResult);

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