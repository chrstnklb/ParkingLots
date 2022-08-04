const { monitorAppUrl, monitorAppPort } = require('../../../config.js');
const vorfaelle = require("./vorfaelle.js");
const createObjectFromJsonFile = require('../../util/json.js').createObjectFromJsonFile;
const writeObjectToJsonFile = require('../../util/json.js').writeObjectToJsonFile;

const express = require("express");
const fileUpload = require("express-fileupload");

const monitorApp = express();

monitorApp.use(express.static("views"));
monitorApp.use(express.urlencoded({ extended: true }));
monitorApp.use(express.json());
monitorApp.use(fileUpload());

monitorApp.set("view engine", "ejs");
monitorApp.set("views", "../views");


monitorApp.get("/", async function (req, res) {
    console.log("/");
    let readVorfaelle = await createObjectFromJsonFile('../../app-schranke/vorfaelle.json')
    // readVorfaelle.keys()
    console.log("🚀 ~ file: monitor-app-server.js ~ line 24 ~ Object.keys(readVorfaelle))", Object.keys(readVorfaelle));
    console.log("🚀 ~ file: monitor-app-server.js ~ line 23 ~ readVorfaelle", readVorfaelle)
    res.render("monitor", { vorfaelle: readVorfaelle });
});

monitorApp.listen(monitorAppPort, () => {
    console.log(`Server Started at ${monitorAppUrl}`);
});

module.exports = monitorApp;
