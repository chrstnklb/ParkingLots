// let allPermissionsArray = [];
// let keys = [];

// let keyOfActualEntryLoadedToEdit = undefined;

// function setAllPermissionsArray(permissions) {
//     allPermissionsArray = Object.values(permissions);
// }

// function deleteAllPermissionsArray() {
//     allPermissionsArray = [];
// }

// function uploadExcelToDb() {
//     //Reference the FileUpload element.
//     let fileUpload = document.getElementById("fileUpload");

//     //Validate whether File is valid Excel file.
//     const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
//     if (regex.test(fileUpload.value.toLowerCase())) {
//         if (typeof(FileReader) != "undefined") {
//             let reader = new FileReader();

//             //For Browsers other than IE.
//             if (reader.readAsBinaryString) {
//                 reader.onload = function(e) {
//                     loadExcelFileToDb(e.target.result);
//                 };
//                 reader.readAsBinaryString(fileUpload.files[0]);
//             } else {
//                 //For IE Browser.
//                 reader.onload = function(e) {
//                     let data = "";
//                     let bytes = new Uint8Array(e.target.result);
//                     for (let i = 0; i < bytes.byteLength; i++) {
//                         data += String.fromCharCode(bytes[i]);
//                     }
//                     loadExcelFileToDb(data);
//                 };
//                 reader.readAsArrayBuffer(fileUpload.files[0]);
//             }
//         } else {
//             alert("This browser does not support HTML5.");
//         }
//     } else {
//         alert("Please upload a valid Excel file.");
//     }
// }

// function loadExcelFileToDb(excelFile) {

//     createDataBase();

//     let excelRows = getRowsFromFirstSheetAsJsonArrayFrom(excelFile);

//     for (let index = 0; index < excelRows.length; index++) {
//         let row = excelRows[index];
//         let erlaubnis = createErlaubnis(index, row);
//         createElement(erlaubnis);
//     }
// }

// function getParkingLotsToEnableCheckboxes(parkingLots) {
//     let parkingLotsToCheck = [];

//     for (let index = 0; index < parkingPlaces.length; index++) {
//         if (parkingLots.includes(parkingPlaces[index])) {
//             parkingLotsToCheck.push(parkingPlaces[index])
//         }
//     }
//     return parkingLotsToCheck;
// }

// function editPermission(key) {
//     keyOfActualEntryLoadedToEdit = key;
//     readElement(key);
// }

// function fillEditFields(doc) {

//     setInputFieldText("kennzeichen", doc["kennzeichen"]);
//     setInputFieldText("land", doc["land"]);
//     setInputFieldText("bemerkung", doc["bemerkung"]);
//     setInputFieldText("nachname", doc["name"]);
//     setInputFieldText("vorname", doc["vorname"]);
//     setInputFieldText("fahrzeug", doc["fahrzeug"]);
//     setInputFieldText("farbe", doc["farbe"]);
//     setInputFieldText("unternehmen", doc["unternehmen"]);
//     setInputFieldText("bereich", doc["bereich"]);
//     setInputFieldText("telefon", doc["telefon"]);

//     editParkingPlacesCheckboxes(false, parkingPlaces);
//     editParkingPlacesCheckboxes(
//         true,
//         getParkingLotsToEnableCheckboxes(
//             doc["parkplaetze"].trim().replace(".", ""))
//     );

// }

// function getPermissionsArray() {
//     if (allPermissionsArray.length === 0) {
//         for (let i = 0; i < keys.length; i++) {
//             let entry = {
//                 id: keys[i],
//                 permissionInformations: JSON.parse(localStorage.getItem(keys[i]))
//             }
//             allPermissionsArray.push(entry);
//         }
//     }
//     return allPermissionsArray;
// }

// function exportPermissionsFor(parkingPlace) {
//     let filename = parkingPlace + ".csv";
//     let permissions = getPermissionsFor(parkingPlace);
//     let data = slicePermissionsToThisInformations(permissions, wantedInformations);

//     saveParkingLots(filename, data);
// }

// function exportPermissionsForAll() {
//     for (let parkingPlaceIndex = 0; parkingPlaceIndex < parkingPlaces.length; parkingPlaceIndex++) {
//         exportPermissionsFor(parkingPlaces[parkingPlaceIndex].toString());
//     }
// }

// function exportDbToCsv() {
//     let filename = getDataAsYyyyMmDdWithSeperator("-") + "ParkplaetzeBackUp.csv";
//     let data = transformPermissionsForCsv();
//     let withHeader = true;

//     saveCsvWithThreeParameter(filename, data, withHeader);
// }

// function getDataAsYyyyMmDdWithSeperator(seperator) {
//     let date = new Date();
//     return date.getFullYear() + seperator +
//         (date.getMonth() + 1) + seperator +
//         date.getDate() + seperator +
//         date.getHours() + seperator +
//         date.getMinutes() + seperator +
//         date.getSeconds() + seperator;
// }

// function transformPermissionsForCsv() {
//     let data = [];

//     for (let i = 0; i < allPermissionsArray.length; i++) {
//         data.push(allPermissionsArray[i].doc);
//     }
//     return data;
// }