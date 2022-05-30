const { monitorAppPort, monitorAppUrl } = require("../../config.js");
const { addWaitingCar, getWaitingCars } = require("../views/monitor.js");

const express = require("express");
const fileUpload = require("express-fileupload");

const monitorApp = express();

monitorApp.use(express.static("views"));
monitorApp.use(express.urlencoded({ extended: true }));
monitorApp.use(express.json());
monitorApp.use(fileUpload());

monitorApp.set("view engine", "ejs");
monitorApp.set("views", "monitor-app/views");

monitorApp.get("/", function (req, res) {
    console.log("/");
    // console.log('req.headers :>> ', req.headers);
    // console.log('req.body :>> ', req.body);
    res.render("monitor", { getWaitingCars });
});

monitorApp.post("/plate", function (req, res) {
    console.log("/plate");
    // console.log('req.headers :>> ', req.headers);
    // console.log('req.body :>> ', req.body);

    let status = 400
    let message;

    if (!req.body.zeitpunkt) message += 'zeitpunkt is missing';
    else if (!req.body.parkplatz) message += 'parkplatz is missing';
    else if (!req.body.kennzeichen) message += 'kennzeichen is missing';
    else {
        addWaitingCar(req.body);
        status = 200
        message = 'ok'
    }

    console.log(message);
    res.status(status).send(message);
});

monitorApp.listen(monitorAppPort, () => {
    console.log(`Server Started at ${monitorAppUrl}`);
});
