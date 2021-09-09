let csvContent = [];

function saveCsvWithThreeParameter(filename, data, withHeader) {
    csvContent = [];
    addHeaderAsFirstEntry(withHeader);
    addDataEntries(data);
    saveDataToCsv(filename);
}

function addHeaderAsFirstEntry(showHeader) {
    if (showHeader) {
        let permissionInformationsWithTimestamp = [...permissionInformations];
        permissionInformationsWithTimestamp.push("timestamp");
        csvContent.push(permissionInformationsWithTimestamp);
    }
}

function addDataEntries(data) {
    data.forEach(mergeHeaderColumnAndContent);
}

function mergeHeaderColumnAndContent(item) {
    let content = [
        item["kennzeichen"],
        item["land"],
        item["bemerkung"],
        item["name"],
        item["vorname"],
        item["fahrzeug"],
        item["farbe"],
        item["unternehmen"],
        item["bereich"],
        item["telefon"],
        item["parkplaetze"],
        item["timestamp"]
    ];
    csvContent.push(content);
}

function saveParkingLots(filename, data, ) {
    csvContent = [];
    addDataEntriesForParkingLots(data);
    saveParkingLotDataToCsv(filename);
}

function addDataEntriesForParkingLots(data) {
    data.forEach(addParkingPlaceContent);
}

function addParkingPlaceContent(item) {
    csvContent.push(item);
}

function saveParkingLotDataToCsv(filename) {

    require('../ftp-server/fileWriter')
        .write(
            "output/ftp-server/" + parking_space + "/" + parking_space,
            "csv",
            data_entry,
            "UTF-8",
            " " + parking_space_counter + " entires to ");


    let blob = new Blob(csvContent, { type: "text/csv;charset=utf-8" });
    saveAs(blob, filename);
}

function saveDataToCsv(filename) {
    csvContent = Papa.unparse(csvContent);
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, filename);
}