// const SHOWN_ROWS_LIMIT = 50;
// const TABLE_ID = 'resultTableId';

// let table;

// function getTable(){return table;}

// function displayPermissionsFilterResult() {

//     if(getFilteredPermissions().length > 0) {
//         createTable();
//     } else {
//         showNoResultHint();
//     }
// }

// function createTable() {
//     let table = initTable();
//     appendTableHead(table);
//     appendTableBody(table, getFilteredPermissions());
// }

// function showNoResultHint(){

//     if(domIdExists(TABLE_ID)) {

//         domRemoveId(TABLE_ID);

//         let hint = domCreateWithAttribute("div", "id","noResult");
//         hint.innerText = '\n😕\n\nEs wurden keine Treffer für\n"' + getSearchTexts().join(" ") + ' ..."\ngefunden!';
//         domAppendChild(domGetId("resultTablePlaceHolder"), hint);
//     }
// }

// function initTable(){
//     table = domCreateWithAttribute("table", "id", TABLE_ID);
//     let resultTablePlaceHolder = domGetId("resultTablePlaceHolder");

//     resultTablePlaceHolder.innerHTML = "";
//     resultTablePlaceHolder.appendChild(table);
//     setTableClassAttributesForTheme();
//     return table;
// }


// function getMaxShownRows(permissionsToShow) {
//     return permissionsToShow.length > SHOWN_ROWS_LIMIT ? SHOWN_ROWS_LIMIT : permissionsToShow.length;
// }

// function appendTableBody(table, permissionsToShow) {

//     let tbody = document.createElement("tbody");

//     for (let index = 0; index < getMaxShownRows(permissionsToShow); index++){
//         tbody.appendChild(createBodyRow(permissionsToShow[index]));
//     }
//     table.appendChild(tbody);
// }

// function prepareColorTextArray(text) {
//     return text
//         .toLowerCase()
//         .replace(/ä/g, 'ae')
//         .replace(/ö/g, 'oe')
//         .replace(/ü/g, 'ue')
//         .replace(/ß/g, 'ss')
//         .replace("/","")
//         .replace(".","")
//         .replace("(","")
//         .replace(")","")
//         .replace("-","")
//         .replace(",","")
//         .replace(",","")
//         .toLowerCase()
//         .split(" ").map(str => str.replace(/\s/g, ''))
//         .filter(String);
// }

// function createTableBodyCellForCarColor(colorTexts) {
//     let colorCell = document.createElement("td");
//     let attributeColorTexts = prepareColorTextArray(colorTexts);

//     for(let i = 0 ; i < attributeColorTexts.length ; i++) {
//         let actualColorText = attributeColorTexts[i];
//         if(actualColorText.length > 2){ // no known color with two letters, but one with three letters: red
//             let frameSpan = domCreateWithAttribute("div", "class", "glyphicon glyphicon-stop");
//             let insideSpan = domCreateWithAttribute("span", "class", "glyphicon glyphicon-stop inside " + actualColorText);
//             frameSpan.appendChild(insideSpan);
//             colorCell.appendChild(frameSpan);
//         }
//     }

//     let textSpan = domCreateWithAttribute("span", "class","colorText");
//     colorCell.appendChild(textSpan);
//     textSpan.innerText = " " + colorTexts.toLowerCase();

//     return colorCell;
// }

// function createBodyRow(permission) {
//     let tr = document.createElement("tr");
//     let rowCells = permission["doc"];

//     tr.appendChild(createTableBodyCellWithActionButtons(permission["id"]));

//     tr.appendChild(createTableBodyCell(rowCells["kennzeichen"]));
//     tr.appendChild(createTableBodyCell(rowCells["land"]));
//     tr.appendChild(createTableBodyCell(rowCells["bemerkung"]));
//     tr.appendChild(createTableBodyCell(rowCells["name"]));
//     tr.appendChild(createTableBodyCell(rowCells["vorname"]));
//     tr.appendChild(createTableBodyCell(rowCells["fahrzeug"]));
//     tr.appendChild(createTableBodyCellForCarColor(rowCells["farbe"]));
//     tr.appendChild(createTableBodyCell(rowCells["unternehmen"]));
//     tr.appendChild(createTableBodyCell(rowCells["bereich"]));
//     tr.appendChild(createTableBodyCell(rowCells["telefon"]));
//     tr.appendChild(createTableBodyCell(rowCells["parkplaetze"]));

//     return tr;
// }

// function createTableBodyCell(text) {
//     let td = document.createElement("td");
//     td.innerText = text;
//     return td;
// }

// function createTableBodyCellWithActionButtons(text) {
//     let td = document.createElement("td");

//     let deleteButton = generateDeleteButtons(text);
//     let editButton = generateEditButtons(text);

//     td.appendChild(deleteButton);
//     td.appendChild(editButton);
//     td.setAttribute("value", text);

//     return td;
// }

// function generateEditButtons(id) {

//     let button = document.createElement("button");

//     button.setAttribute("class", "btn btn-success editButton glyphicon glyphicon-edit");
//     button.setAttribute("type", "button");
//     button.setAttribute("data-toggle", "modal");
//     button.setAttribute("data-target", "#exampleModal");
//     button.setAttribute("title", "Öffnet diesen Eintrag für die Bearbeitung");
//     button.addEventListener("click", function() {editPermission(id)});

//     return button;
// }

// function appendTableHead(table) {
//     let thead = document.createElement("thead");
//     thead.setAttribute("class","thead");
//     thead.appendChild(createTableHeadRow());
//     table.appendChild(thead);
// }

// function createTableHeadRow() {
//     let tr = document.createElement("tr");

//     tr.appendChild(createTableHeadCell("Aktionen"));

//     permissionInformations.forEach(permission => tr.appendChild(createTableHeadCell(permission)));

//     return tr;
// }

// function createTableHeadCell(text) {
//     let th = document.createElement("th");
//     th.innerText = text;
//     return th;
// }

