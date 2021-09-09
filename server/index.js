const { create } = require('domain');
const { response } = require('express');
var express = require('express')
var app = express();
const path = require('path');

var PouchDB = require('pouchdb');

// local database, that lives in the browser's IndexedDB store
var localDB = new PouchDB('mylocaldb')
console.log("Database created Successfully at " + localDB.name);
localDB
 .info()
 .then(function (info) {
   console.log(info);
 })

// remote CouchDB 
var remoteDB = new PouchDB('http://localhost:5984/myremotedb')

console.log("Database created Successfully at " + remoteDB.name);
remoteDB
 .info()
 .then(function (info) {
   console.log(info);
 })

// app.use(express.static('public'));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'));
//     // res.sendFile(path.join(__dirname, '/styles.css'));
// });

// app.get('/style.css', function(req, res) {
//     res.sendFile(__dirname + "/" + "style.css");
// });

app.use(express.static("../server/public"));

app.get('/process_get', function(req, res) {
    // let response = {
    //     first_name: req.query.first_name
    // };
    let response = {
        "ok": true,
        "_id": "mydoc",
        "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
      };
    console.log(response + " wurde erfolgreich gespeichert");
    console.log("Nun der Versuch in die DB zu schreiben");
    createElement(response);
    console.log("Versuch beendet.");
    res.end(JSON.stringify(response));
})

var server = app.listen(3001, "127.0.0.2", function(error) {
    if (error) {
        console.log("something went wrong")
    } else {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        console.log("our server is listening on host " + host)
        console.log("our server is listening on port " + port)
    }

})

// db = new PouchDB('http://localhost:3000/parkplaetze');
// let db = new PouchDB('http://127.0.0.1:3000/parkerlaubnisse');


// function createDataBase() {
//     // old local db connection, necessary for migration from old to new in next release
//     // db = new PouchDB('parkplaetze');
//     // db = new PouchDB('http://localhost:3000/parkplaetze');
//     // db = new PouchDB('http://127.0.0.1:3000/parkerlaubnisse');
//     console.log("Database created Successfully at " + db.address);
// }

function createElement(element) {
    db.put({
        _id: 'mydoc',
        title: 'Heroes'
      }).then(function (response) {
        // handle response
      }).catch(function (err) {
        console.log(err);
      });
}

// createDataBase();