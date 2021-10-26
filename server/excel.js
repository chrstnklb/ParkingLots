if (typeof require !== 'undefined') XLSX = require('xlsx');

const EXCEL_SHEET_NUMBER = 0

/* DO SOMETHING WITH workbook HERE */

// someThings.js



module.exports.writeExcelEntriesToDatabase = function (file) {

    console.log("/writeExcelEntriesToDatabase Start: " + (new Date(Date.now())).toLocaleTimeString());


    let workbook = XLSX.readFile(file);

    let firstSheet = workbook.SheetNames[EXCEL_SHEET_NUMBER];
    let sheet = workbook.Sheets[firstSheet];
    let rows = XLSX.utils.sheet_to_json(sheet);

    console.log("/writeExcelEntriesToDatabase Ende: " + (new Date(Date.now())).toLocaleTimeString());

    return rows;

}

