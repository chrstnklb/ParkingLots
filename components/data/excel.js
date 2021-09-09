const EXCEL_SHEET_NUMBER = 0;

function getRowsFromFirstSheetAsJsonArrayFrom(excelFile) {
    let workbook = readDataFromExcelFile(excelFile);
    let firstSheet = getSheetName(workbook, EXCEL_SHEET_NUMBER);
    let sheet = getSheet(workbook, firstSheet);
    return getSheetRowsAsJsonArray(sheet);
}

function readDataFromExcelFile(data) {
    return XLSX.read(data, {
        type: 'binary'
    });
}

function getSheetName(workbook, sheetNumber) {
    return workbook.SheetNames[sheetNumber];
}

function getSheet(workbook, firstSheet) {
    return workbook.Sheets[firstSheet];
}

function getSheetRowsAsJsonArray(sheet) {
    return XLSX.utils.sheet_to_json(sheet);
}
