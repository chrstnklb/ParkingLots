if (typeof require !== 'undefined') XLSX = require('xlsx');

const EXCEL_SHEET_NUMBER = 0

module.exports.writeExcelEntriesToDatabase = function (filename) {

    let workbook = XLSX.readFile(filename);

    let firstSheet = workbook.SheetNames[EXCEL_SHEET_NUMBER];
    let sheet = workbook.Sheets[firstSheet];
    let rows = XLSX.utils.sheet_to_json(sheet);

    return rows;
}

module.exports.readExcelEntriesFromDatabase = function (data, filename) {
    const sheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, sheet, 'Responses')

    XLSX.writeFile(workbook, filename)
}