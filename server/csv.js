const fs = require('fs')
const folder = "./server/outgoing-files/"

module.exports.writeCsvFile = function (fileName, content) {
    console.log("writeCsvFile");

    let csvLines = generateFileContent(content);

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

function generateFileContent(content) {
    // console.log('content :>> ', content.docs);
    let csvContent = "";
    content.docs.forEach(element => {
        csvContent +=
            element.kennzeichen + ";" +
            element.land + ";" +
            element.nachname + ", " +
            element.vorname + "\n";
    });
    return csvContent;
}

