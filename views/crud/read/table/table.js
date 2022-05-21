const { calculateDaysSinceDateDDMMYYYY } = require("../../../util/time.js")

const SHOWN_ROWS_LIMIT = 50;
const TABLE_ID = 'resultTableId';
let table;

const columnOrder = {
    kennzeichen: "Kennzeichen",
    land: "Land",
    bemerkung: "Bemerkung",
    nachname: "Nachname",
    vorname: "Vorname",
    fahrzeug: "Fahrzeug",
    farbe: "Farbe",
    unternehmen: "Unternehmen",
    bereich: "Bereich",
    telefon: "Telefon",
    parkplaetze: "Parkplätze",
    letzteAenderung: "Letzte Änderung"
}

function getTable() { return table; }

function displayPermissionsFilterResult() {

    if (filteredPermissions.length > 0) {
        createTable();
        domHideNoResultFoundHint();
    } else {
        showNoResultHint();
    }
}

function createTable() {
    let table = initTable();
    appendTableHead(table);
    appendTableBody(table);
}

function showNoResultHint() {

    if (domIdExists(TABLE_ID)) {
        domRemoveId(TABLE_ID);
        domShowNoResultFoundHint();
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


function getMaxShownRows() {
    return filteredPermissions.length > SHOWN_ROWS_LIMIT ? SHOWN_ROWS_LIMIT : filteredPermissions.length;
}

function appendTableBody(table) {

    let tbody = document.createElement("tbody");

    for (let index = 0; index < getMaxShownRows(); index++) {
        tbody.appendChild(createBodyRow(filteredPermissions[index]));
    }
    table.appendChild(tbody);
}

module.exports.extendLetzteAenderung = function (letzteAenderung) {
    let diff = calculateDaysSinceDateDDMMYYYY(letzteAenderung);
    if (diff === 0) return letzteAenderung += " (neu)";
    if (diff === 1) return letzteAenderung += " (vor einem Tag)";
    if (diff < 7) return letzteAenderung += " (vor " + diff + " Tagen)";
    if (diff < 30) return letzteAenderung += " (vor " + Math.floor(diff / 7) + " Wochen)";
    if (diff < 365) return letzteAenderung += " (vor " + Math.floor(diff / 30) + " Monaten)";
    if (diff > 365) return letzteAenderung += " (vor " + Math.floor(diff / 365) + " Jahren)";
}

function createBodyRow(permission) {
    // TODO: undefined values in permission abfangen
    let rowTitle =
        "\n PARKERLAUBNIS" +
        "\n " +
        "\n Vorname:             " + permission["vorname"] +
        "\n Nachname:          " + permission["nachname"] +
        "\n Kennzeichen:       " + permission["kennzeichen"] +
        "\n Land:                    " + permission["land"] +
        "\n Bemerkung:         " + permission["bemerkung"] +
        "\n Fahrzeug:             " + permission["fahrzeug"] +
        "\n Farbe:                   " + permission["farbe"] +
        "\n Unternehmen:      " + permission["unternehmen"] +
        "\n Bereich:                " + permission["bereich"] +
        "\n Telefon:                " + permission["telefon"] +
        "\n Parkplätze:           " + permission["parkplaetze"]?.trim().replaceAll("-", ", ") +
        "\n Letzte Änderung: " + permission["letzteAenderung"]

    let tr = domCreateWithAttribute("tr", "title", rowTitle);

    tr.appendChild(createTableBodyCellWithActionButtons(permission["_id"]));

    Object.keys(columnOrder).forEach(key => {
        let child;
        switch (key) {
            case "letzteAenderung":
                child = createTableBodyCell(extendLetzteAenderung(permission["letzteAenderung"]));
                break;
            case "parkplaetze":
                let parkplaetze = permission["parkplaetze"]
                if (typeof parkplaetze !== 'undefined') {
                    parkplaetze = parkplaetze.split("-").toString();
                    parkplaetze = parkplaetze.replaceAll(",", ", ");
                } else {
                    parkplaetze = ""
                }
                child = createTableBodyCell(parkplaetze);
                break;
            case "kennzeichen":
                let kennzeichen = permission["kennzeichen"];
                if (typeof kennzeichen !== 'undefined' && kennzeichen.substring(kennzeichen.length - 1).toLowerCase() === "e") {
                    kennzeichen += " ⚡"
                }
                child = createTableBodyCell(kennzeichen);
                break;
            default:
                child = createTableBodyCell(permission[key]);
        }
        tr.appendChild(child);
    })

    return tr;
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

