const fs = require('fs')

module.exports.writeCsvFile = function (content, parkingLot) {

    const folder = "./server/outgoing-files/"
    let fileName = generateFileName(parkingLot);
    let csvLines = generateFileContent(content);
    console.log("writeCsvFile");

    fs.writeFile(folder + fileName, csvLines, err => {
        if (err) { console.error(err); return }
        //file written successfully
    })
}

function generateFileName(parkingLot) {

    const timeServer = require("./time-server");
    // TODO: JobTicket mit Unterstrich?!
    return parkingLot +
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

