var express = require('express')
var app = express();

var PouchDB = require('pouchdb');

var db;
createDataBase();

console.log("hello indexJS")

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'));
//     // res.sendFile(path.join(__dirname, '/styles.css'));
// });

// app.get('/style.css', function(req, res) {
//     res.sendFile(__dirname + "/" + "style.css");
// });

app.get('/process_get', function(req, res) {
    // let response = {
    //     first_name: req.query.first_name
    // };
    console.log("test")
    let response = {
        "ok": true,
        "_id": "mydoc",
        "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
    };
    console.log(response + " wurde erfolgreich gespeichert");
    console.log("Nun der Versuch in die DB zu schreiben");

    createDataBase();

    createElement(response);
    console.log("Versuch beendet.");
    res.end(JSON.stringify(response));
})



// var server = app.listen(3001, "127.0.0.2", function(error) {
//     if (error) {
//         console.log("something went wrong")
//     } else {
//         var host = server.address().address
//         var port = server.address().port
//         console.log("Example app listening at http://%s:%s", host, port)
//         console.log("our server is listening on host " + host)
//         console.log("our server is listening on port " + port)
//     }

// })

// db = new PouchDB('http://localhost:3000/parkplaetze');
// let db = new PouchDB('http://127.0.0.1:3000/parkerlaubnisse');


function createDataBase() {
    // db = new PouchDB('parkplaetze');
    // db = new PouchDB('http://localhost:3000/parkplaetze');
    console.log("Database created Successfully at ???");
    db = new PouchDB('http://127.0.0.1:5984/parkerlaubnisse');
    console.log("Database created Successfully at " + db.address);
}



function createElement(element) {
    db.put({
        _id: 'mydoc',
        title: 'Heroes'
    }).then(function(response) {
        // handle response
    }).catch(function(err) {
        console.log(err);
    });
}

// createDataBase();