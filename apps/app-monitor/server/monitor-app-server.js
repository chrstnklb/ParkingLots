const { monitorAppUrl, monitorAppPort } = require("../../../config.js");
const { addWaitingCar, getWaitingCars } = require("../views/monitor.js");

const express = require("express");
const fileUpload = require("express-fileupload");

const monitorApp = express();

monitorApp.use(express.static("views"));
monitorApp.use(express.urlencoded({ extended: true }));
monitorApp.use(express.json());
monitorApp.use(fileUpload());

monitorApp.set("view engine", "ejs");
monitorApp.set("views", "apps/app-monitor/views");

function startServer() {
    monitorApp.listen(monitorAppPort, () => {
        console.log(`Server Started at ${monitorAppUrl}`);
    });
}

monitorApp.get("/", function (req, res) {
    console.log("/");
    res.render("monitor", { getWaitingCars });
});

module.exports = monitorApp;
