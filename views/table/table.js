const SHOWN_ROWS_LIMIT = 50;
const TABLE_ID = 'resultTableId';

let table;

const columnOrder = {
    kennzeichen: "Kennzeichen",
    land: "Land",
    bemerkung: "Bemerkung",
    name: "Name",
    vorname: "Vorname",
    fahrzeug: "Fahrzeug",
    farbe: "Farbe",
    unternehmen: "Unternehmen",
    bereich: "Bereich",
    telefon: "Telefon",
    parkplaetze: "Parkplaetze",
    letzteAenderung: "Letzte Änderung"
}

function getTable() { return table; }

function displayPermissionsFilterResult() {

    if (getFilteredPermissions().length > 0) {
        createTable();
    } else {
        showNoResultHint();
    }
}

function createTable() {
    let table = initTable();
    appendTableHead(table);
    appendTableBody(table, getFilteredPermissions());
}

function showNoResultHint() {

    if (domIdExists(TABLE_ID)) {

        domRemoveId(TABLE_ID);

        let hint = domCreateWithAttribute("div", "id", "noResult");
        hint.innerText = '\n😕\n\nEs wurden keine Treffer für\n"' + getSearchTexts().join(" ") + ' ..."\ngefunden!';
        domAppendChild(domGetId("resultTablePlaceHolder"), hint);
    }
}

function initTable() {
    table = domCreateWithAttribute("table", "id", TABLE_ID);
    let resultTablePlaceHolder = domGetId("resultTablePlaceHolder");

    resultTablePlaceHolder.innerHTML = "";
    resultTablePlaceHolder.appendChild(table);
    setTableClassAttributesForTheme();
    return table;
}


function getMaxShownRows(permissionsToShow) {
    return permissionsToShow.length > SHOWN_ROWS_LIMIT ? SHOWN_ROWS_LIMIT : permissionsToShow.length;
}

function appendTableBody(table, permissionsToShow) {

    let tbody = document.createElement("tbody");

    for (let index = 0; index < getMaxShownRows(permissionsToShow); index++) {
        tbody.appendChild(createBodyRow(permissionsToShow[index]));
    }
    table.appendChild(tbody);
}

function prepareColorTextArray(text) {
    return text
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace("/", "")
        .replace(".", "")
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace(",", "")
        .replace(",", "")
        .toLowerCase()
        .split(" ").map(str => str.replace(/\s/g, ''))
        .filter(String);
}

function createTableBodyCellForCarColor(colorTexts) {
    let colorCell = document.createElement("td");
    let attributeColorTexts = prepareColorTextArray(colorTexts);

    for (let i = 0; i < attributeColorTexts.length; i++) {
        let actualColorText = attributeColorTexts[i];
        if (actualColorText.length > 2) { // no known color with two letters, but one with three letters: red
            let frameSpan = domCreateWithAttribute("div", "class", "glyphicon glyphicon-stop");
            let insideSpan = domCreateWithAttribute("span", "class", "glyphicon glyphicon-stop inside " + actualColorText);
            // frameSpan.appendChild(insideSpan);
            // colorCell.appendChild(frameSpan);
        }
    }

    let textSpan = domCreateWithAttribute("span", "class", "colorText");
    colorCell.appendChild(textSpan);
    textSpan.innerText = " " + colorTexts.toLowerCase();

    return colorCell;
}

function createBodyRow(permission) {
    let tr = document.createElement("tr");

    tr.appendChild(createTableBodyCellWithActionButtons(permission["_id"]));

    Object.keys(columnOrder).forEach(key => {
        let child;
        switch (key) {
            case "farbe":
                child = createTableBodyCellForCarColor(permission["farbe"]);
                break;
            case "letzteAenderung":
                child = createTableBodyCell(extendLetzteAenderung(permission["letzteAenderung"]));
                break;
            default:
                child = createTableBodyCell(permission[key]);
        }
        tr.appendChild(child);
    })

    return tr;
}


function extendLetzteAenderung(letzteAenderung) {

    let diff = calculateDaysSinceLetzteAenderung(letzteAenderung);

    if (diff != 0) {
        letzteAenderung += " (vor " + diff + " Tagen)";
    }
    return letzteAenderung;
}

function calculateDaysSinceLetzteAenderung(letzteAenderung) {
    let year = letzteAenderung.slice(6, 10);
    let month = letzteAenderung.slice(3, 5);
    let day = letzteAenderung.slice(0, 2);
    let lastChangeDate = new Date(year, month - 1, day);
    let today = (new Date());
    return Math.floor((today - lastChangeDate) / 1000 / 60 / 60 / 24);
}

function createTableBodyCell(text) {
    let td = document.createElement("td");
    td.innerText = text;
    return td;
}

function createTableBodyCellWithActionButtons(text) {
    let td = document.createElement("td");

    let deleteButton = generateDeleteButtons(text);
    let editButton = generateEditButtons(text);

    td.appendChild(deleteButton);
    td.appendChild(editButton);
    td.setAttribute("value", text);

    return td;
}



function appendTableHead(table) {
    let thead = document.createElement("thead");
    thead.setAttribute("class", "thead");
    thead.appendChild(createTableHeadRow());
    table.appendChild(thead);
}

function createTableHeadRow() {

    let tr = document.createElement("tr");
    tr.appendChild(createTableHeadCell("Aktionen"));

    Object.values(columnOrder).forEach(columnName => {
        tr.appendChild(createTableHeadCell(columnName))
    });

    return tr;
}

function createTableHeadCell(text) {
    let th = document.createElement("th");
    th.innerText = text;
    return th;
}

