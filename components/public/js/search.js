// // function getSearchTexts() {
// //     return getSearchInputField() === null
// //         ? []
// //         : getSearchInputField().value.trim().split(" ");
// // }

// function displayPermissionsFilterResultCount() {
//     showResult(getFilteredPermissions().length);
// }

// // function searchAndShowPermissions(){

// //     deleteFilteredPermissions();
// //     let searchTexts = getSearchTexts();
// //     enableAdminArea(searchTexts.join(""));

// //     let rowMatchesSearchText = false;
// //     let rows = allPermissionsArray;
// //     for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
// //         let row = rows[rowIndex];
// //         rowMatchesSearchText = thisRowFitsWithAllSearchTexts(searchTexts, Object.values(row.doc));
// //         addPermissionToFilteredPermissions(rowMatchesSearchText, row);
// //     }
// //     displayPermissionsFilterResult();
// //     displayPermissionsFilterResultCount();
// // }

// function thisRowFitsWithAllSearchTexts(searchTexts, row) {

//     let allSearchTextsFindMatchInSomeCellText = false;

//     for (let searchTextIndex = 0; searchTextIndex < searchTexts.length; searchTextIndex++) {
//         if(oneCellTextFitsSearchText(searchTexts[searchTextIndex],row)){
//             allSearchTextsFindMatchInSomeCellText = true;
//         }else{
//             allSearchTextsFindMatchInSomeCellText = false;
//             break;
//         }
//     }

//     return allSearchTextsFindMatchInSomeCellText;
// }

// function cellHasContent(cellTexts) {
//     let hasContent = false;

//     if(cellTexts !== null) {
//         if(cellTexts.length > 0) {
//             hasContent = true;
//         }
//     }
//     return hasContent;
// }

// function cellIsTimeStamp(cellsIndex) {
//     return  cellsIndex === 0    ||  // timestamp
//             cellsIndex === 12   ||  // id
//             cellsIndex === 13;      // pouchdb revision number
// }

// function oneCellTextFitsSearchText(searchText, cells) {

//     let oneTextFits = false;

//     for (let cellsIndex = 0; cellsIndex < cells.length; cellsIndex++) {

//         let cellTexts = cells[cellsIndex];
//         if(cellHasContent(cellTexts) && !cellIsTimeStamp(cellsIndex)){
//             cellTexts = cellTexts.split(" ");
//             for (let cellTextsIndex = 0; cellTextsIndex < cellTexts.length; cellTextsIndex++) {
//                 if(isSubstringOf(searchText, cellTexts[cellTextsIndex])){
//                     oneTextFits = true;
//                     break;
//                 }
//             }
//         }
//     }

//     return oneTextFits;
// }

// function isSubstringOf(subSearchString, cellString) {
//     return cellString.toUpperCase().includes(subSearchString.toUpperCase());
// }

// function setSearchFieldText(text) {
//     getSearchInputField().value = text;
// }

// function showResult(filteredPermissionsCount){

//     pollDOM();
//     let resultCount = pollDOM();
//     resultCount.textContent =
//         getShowCount(filteredPermissionsCount) + " / " + filteredPermissionsCount;
// }

// function pollDOM() {
//     const el = document.getElementById("resultCount");

//     if (el !== null) {
//         if (el !== undefined) {
//             if (el.textContent !== undefined) {
//                 return el;
//             }
//         }
//     } else {
//         setTimeout(pollDOM, 1000); // try again in 300 milliseconds
//     }
// }

// function getShowCount(filteredPermissionsCount){
//     return filteredPermissionsCount < SHOWN_ROWS_LIMIT ? filteredPermissionsCount : SHOWN_ROWS_LIMIT;
// }

// function setFocusToSearchField(){
//     getSearchInputField().focus();
// }