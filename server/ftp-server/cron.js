// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

var PouchDB = require('pouchdb');
let cronTime = '*/5 * * * * *'

const parkingPlaces = [
    "A75",
    "Job Ticket",
    "P1",
    "P2",
    "P3",
    "P3 Erw",
    "P4",
    "P5",
    "P6",
    "Werk"
];

let cronDbConnection = new PouchDB('http://adminuwe:adminuwe@localhost:5984/erlaubnisse');

let CronJob = require('cron').CronJob;
let job = new CronJob(cronTime, function () {
    console.log('CRON STARTED');
    exportAllCameraCsvImportFiles();
}, null, true, 'America/Los_Angeles');

let read_db_rows_count = -1;
let read_db_rows;

function exportAllCameraCsvImportFiles() {
    getAll()
    if (dbEntriesSuccessfullyRead()) {
        parkingPlaces.forEach(parkingPlace => exportCsvForCameraFor(parkingPlace))
    }
}

function getAll() {
    cronDbConnection.allDocs({
        include_docs: true
    }).then(function (result) {
        read_db_rows_count = result.total_rows
        read_db_rows = result.rows
    }).catch(function (err) {
        console.log(err);
    });
}

function exportCsvForCameraFor(parking_space) {
    let data_entry = ""
    let parking_space_counter = 0
    read_db_rows = Object.values(read_db_rows);
    read_db_rows.forEach(element => {
        if (element.doc["parkplaetze"].toString().includes(parking_space)) {
            parking_space_counter++
            data_entry = data_entry +
                element.doc["kennzeichen"] + ";" +
                element.doc["land"] + ";" +
                element.doc["name"] + ", " +
                element.doc["vorname"] + "\n"
        }
    });

    require('./fileWriter')
        .write(
            "output/ftp-server/" + parking_space + "/" + parking_space,
            "csv",
            data_entry,
            "UTF-8",
            " " + parking_space_counter + " entires to ");
}

function dbEntriesSuccessfullyRead() {
    console.log("Actual read db entry count: " + read_db_rows_count)
    return read_db_rows_count !== -1;
}