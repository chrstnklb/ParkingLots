const globals = require('../../../../globals.js');
const excel = require("../excel");

const { cronTime, excelFolder, ftpFolderOutgoing } = require("../../../../config.js");

const db = require("../../../database/db");
let CronJob = require("cron").CronJob;

let job = new CronJob(
  cronTime,
  function () {
    console.log("CRON STARTED");
    exportAllCameraCsvImportFiles();
    exportAllPermissionsAsExcelFile();
  },
  null,
  true,
  "America/Los_Angeles"
);

let read_db_rows_count = -1;
let read_db_rows;

function exportAllCameraCsvImportFiles() {
  getAll();
  if (dbEntriesSuccessfullyRead()) {
    globals.parkingPlaces.forEach((parkingPlace) =>
      exportCsvForCameraFor(parkingPlace)
    );
  }
}

function getAll() {
  db
    .getAll()
    .then(function (result) {
      // console.log("result: "+ result);
      read_db_rows_count = result.total_rows;
      read_db_rows = result.rows;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function exportCsvForCameraFor(parking_space) {
  let data_entry = "";
  let parking_space_counter = 0;
  read_db_rows = Object.values(read_db_rows);
  read_db_rows.forEach((element) => {
    if (element.doc["parkplaetze"]?.toString().includes(parking_space)) {
      parking_space_counter++;
      data_entry =
        data_entry +
        element.doc["kennzeichen"].replace("-", "") +
        ";" +
        element.doc["land"] +
        ";" +
        element.doc["nachname"] +
        ", " +
        element.doc["vorname"] +
        "\n";
    }
  });

  require("./fileWriter").write(
    ftpFolderOutgoing + parking_space,
    "csv",
    data_entry,
    "UTF-8",
    " " + parking_space_counter + " entires to "
  );
}

function dbEntriesSuccessfullyRead() {
  console.log("Actual read db entry count: " + read_db_rows_count);
  return read_db_rows_count !== -1;
}

function exportAllPermissionsAsExcelFile() {
  const timestamp =
    "_" + new Date(Date.now()).toLocaleDateString() + "_" + Date.now();
  const filePath = excelFolder + "erlaubnisse" + timestamp + ".xlsx";

  let data = [];

  db.getAll()
    .then(function (result) {
      console.log("result" + result)
      result.doc.rows.forEach((row) => {
        data.push({
          Nachname: row.doc.nachname,
          Vorname: row.doc.vorname,
          Unternehmen: row.doc.unternehmen,
          Bereich: row.doc.bereich,
          Telefon: row.doc.telefon,
          Kennzeichen: row.doc.kennzeichen,
          Land: row.doc.land,
          Fahrzeug: row.doc.fahrzeug,
          Farbe: row.doc.farbe,
          Bemerkung: row.doc.bemerkung,
          Parkplaetze: row.doc.parkplaetze,
          // explicit: no searchHash as download
        });
      });
    })
    .then(() => {
      excel.writeExcelEntriesFromDatabase(data, filePath);
    })
    // .then(() => {
    //   res.download(filePath);
    // })
    .catch(function (err) {
      console.log(err);
    });
}
