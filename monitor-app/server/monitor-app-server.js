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

monitorApp.get("/", function (_req, res, next) {
  console.log("/");
  // res.render("monitor", { getWaitingCars });
  // if (getWaitingCars)
  res.render("monitor", { getWaitingCars });
  // else
  // res.render("monitor")
});

monitorApp.post("/plate", function (req, res) {
  console.log("/plate");
  console.log('req.data.plate :>> ', req.body.plate);
  addWaitingCar(req.body);
  res.render("monitor", { getWaitingCars });
});

monitorApp.listen(monitorAppPort, () => {
  console.log(`Server Started at ${monitorAppUrl}`);
});
