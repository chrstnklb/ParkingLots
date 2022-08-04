const { monitorAppUrl, monitorAppPort } = require('../../../config.js');
const createObjectFromJsonFile = require('../../util/json.js').createObjectFromJsonFile;

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
    res.render("monitor", { vorfaelle: readVorfaelle });
});

monitorApp.listen(monitorAppPort, () => {
    console.log(`Server Started at ${monitorAppUrl}`);
});

module.exports = monitorApp;
