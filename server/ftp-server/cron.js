const { ftpFolderOutgoing, cronTime, dbUrl } = require('../../config.js');

var PouchDB = require('pouchdb');

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

let cronDbConnection = new PouchDB(dbUrl);

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
        if (element.doc["parkplaetze"]?.toString().includes(parking_space)) {
            parking_space_counter++
            data_entry = data_entry +
                element.doc["kennzeichen"].replace("-","") + ";" +
                element.doc["land"] + ";" +
                element.doc["nachname"] + ", " +
                element.doc["vorname"] + "\n"
        }
    });

    require('./fileWriter')
        .write(
            // ftpFolderOutgoing + parking_space + "/" + parking_space,
            ftpFolderOutgoing + parking_space,
            "csv",
            data_entry,
            "UTF-8",
            " " + parking_space_counter + " entires to ");
}

function dbEntriesSuccessfullyRead() {
    console.log("Actual read db entry count: " + read_db_rows_count)
    return read_db_rows_count !== -1;
}