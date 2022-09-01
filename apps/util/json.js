const fs = require('fs');
var path = require('path');

module.exports.createObjectFromJsonFile = function (filePath) {
    console.log("Current __dirname:", __dirname);
    console.log("Current filePath:", filePath);
    console.log("Current directory:", process.cwd());
    path.join(process.cwd() + filePath)
    console.log("🚀 ~ file: json.js ~ line 9 ~ path.join(process.cwd() + filePath)", path.join(process.cwd() + filePath))

    return JSON.parse(fs.readFileSync('C:\\LPR-DB\\ParkingLots\\ParkingLots-develop\\apps\\app-schranke\\vorfaelle.json', 'utf8'));
}

module.exports.writeObjectToJsonFile = function (filePath, object) {
    fs.writeFileSync('C:\\LPR-DB\\ParkingLots\\ParkingLots-develop\\apps\\app-schranke\\vorfaelle.json', JSON.stringify(object));
}