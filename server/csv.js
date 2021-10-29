const fs = require('fs')
const folder = "./server/outgoing-files/"

module.exports.writeCsvFile = function (fileName, content) {
    console.log("writeCsvFile");

    let csvLines = generateFileContent(content.docs);

    fs.writeFile(fileName, csvLines, err => {
        if (err) { console.error(err); return }
        //file written successfully
    })
}

module.exports.generateFileName = function (parkingLot) {

    const timeServer = require("./util/time-server");
    return folder +
        parkingLot +
        "-" +
        timeServer.getNowAsYYYYMMDD() +
        "-" +
        timeServer.getNowAsHHMMSS() +
        ".csv";
}

function generateFileContent(docs) {
    let csvContent = "";
    docs.forEach(doc => {
        csvContent +=
            doc.kennzeichen + ";" +
            doc.land + ";" +
            doc.nachname + ", " +
            doc.vorname + "\n";
    });
    return csvContent;
}

module.exports = generateFileContent;
