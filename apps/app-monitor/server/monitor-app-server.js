const { monitorAppUrl, monitorAppPort } = require('../../../config.js');
const vorfaelle = require("./vorfaelle.js");

const express = require("express");
const fileUpload = require("express-fileupload");

const monitorApp = express();

monitorApp.use(express.static("views"));
monitorApp.use(express.urlencoded({ extended: true }));
monitorApp.use(express.json());
monitorApp.use(fileUpload());

monitorApp.set("view engine", "ejs");
monitorApp.set("views", "../views");


monitorApp.get("/", function (req, res) {
    console.log("/");
    res.render("monitor", { vorfaelle: vorfaelle.createObjectFromJsonFile('../../app-schranke/vorfaelle.json') });
});

monitorApp.listen(monitorAppPort, () => {
    console.log(`Server Started at ${monitorAppUrl}`);
});

module.exports = monitorApp;
