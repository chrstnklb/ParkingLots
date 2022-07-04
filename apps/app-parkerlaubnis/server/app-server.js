const {
  // folderIncoming,
  // folderOutgoing,
  appPort,
  appUrl,
  // dbUrl,
} = require("../../../config.js");

const path = require('path');
// var excel = require("./excel");
// var csv = require("./csv");

const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.static(path.join(__dirname + "./../views")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.set("view engine", "ejs");

// app.set("views", ["views", "views/table", path.join(__dirname + "./../views")]);
app.set("views", [path.join(__dirname + "./../views")]);

console.log(`1: ${path.join(__dirname + "./../views")}`);
console.log(`2: ${path.join(__dirname + "/../views")}`);
console.log(`3: ${path.join(__dirname + "../views")}`);
console.log(`4: ${path.join(__dirname + "./views")}`);
console.log(`5: ${path.join(__dirname + "/views")}`);
console.log(`6: ${path.join(__dirname + "views")}`);
console.log(`6: ${path.join(__dirname + "//views")}`);
console.log(`7: ${path.join(__dirname + "//apps/app-parkerlaubnis/views")}`);

const db = require('../../database/db.js');
// const con = db.getDbConnection();

app.get("/", function (_req, res, next) {
  console.log("/");
  res.render("main/index");
  next();
});

app.get("/search", (_req, res) => {
  console.log("/search");
  db.search().then((result) => {
    res.json(result);
  });
});

app.listen(appPort, () => {
  console.log(`Server Started at ${appUrl}`);
});

app.post("/create", function (req, res) {
  console.log("/create");
  db.create(req.body.parkerlaubnis).then((result) => {
    if (result.ok) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.post("/edit", function (req, res) {
  console.log("/edit");
  const id = req.body.parkerlaubnis._id;
  const parkerlaubnis = req.body.parkerlaubnis;
  db.edit(id, parkerlaubnis).then((result) => {
    res.sendStatus(result);
  });
});

app.post("/delete", function (req, res) {
  console.log("/delete");
  db.remove(req.body._id).then((result) => {
    if (result.ok) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.post("/upload", (req, res) => {
  console.log("/upload");
  db.uploadXlsx(req.files)
    .then((result) => {
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/upload2", (req, res) => {
  console.log("/upload2");

  if (req.files) {
    const file = req.files.fileUploaded;
    const filePath = folderIncoming + file.name;

    file.mv(`${filePath}`, (err) => {
      let count = getMaxId();

      if (err) {
        console.log(err);
        res.send("There is error");
      } else {
        let rows = excel.writeExcelEntriesToDatabase(`${filePath}`);
        let parkerlaubnisArray = [];
        let letzteAenderung = new Date(Date.now()).toLocaleDateString();
        rows.forEach((row) => {
          parkerlaubnisArray.push({
            _id: (count++).toString(),

            letzteAenderung: letzteAenderung,

            nachname: row.Nachname,
            vorname: row.Vorname,
            unternehmen: row.Unternehmen,
            bereich: row.Bereich,
            telefon: row.Telefon,
            kennzeichen: row.Kennzeichen,
            land: row.Land,
            fahrzeug: row.Fahrzeug,
            farbe: row.Farbe,
            bemerkung: row.Bemerkung,
            parkplaetze: row.Parkplaetze,

            searchHash:
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
              row.Parkplaetze,
          });
        });

        db.bulkDocs(parkerlaubnisArray, function (err) {
          if (err) return console.log(err);
        })
          .then(() => {
            res.redirect("/");
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    });
  } else {
    res.send("There are no files");
  }
});

// app.get("/downloadDbAsXlsx", (req, res) => {
//   const timestamp =
//     "_" + new Date(Date.now()).toLocaleDateString() + "_" + Date.now();
//   const folder = folderOutgoing;
//   const filePath = folder + "erlaubnisse" + timestamp + ".xlsx";

//   let data = [];

//   con
//     .allDocs({ include_docs: true })
//     .then(function (result) {
//       result.rows.forEach((row) => {
//         data.push({
//           Nachname: row.doc.nachname,
//           Vorname: row.doc.vorname,
//           Unternehmen: row.doc.unternehmen,
//           Bereich: row.doc.bereich,
//           Telefon: row.doc.telefon,
//           Kennzeichen: row.doc.kennzeichen,
//           Land: row.doc.land,
//           Fahrzeug: row.doc.fahrzeug,
//           Farbe: row.doc.farbe,
//           Bemerkung: row.doc.bemerkung,
//           Parkplaetze: row.doc.parkplaetze,
//           // explicit: no searchHash as download
//         });
//       });
//     })
//     .then(() => {
//       excel.writeExcelEntriesFromDatabase(data, filePath);
//     })
//     .then(() => {
//       res.download(filePath);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });
