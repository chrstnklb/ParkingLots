let allPermissions = [];
let filteredPermissions;

const LENGTH_OF_ID = 13;
const LENGTH_OF_REV = 13;
const LENGTH_OF_ID_AND_REV = LENGTH_OF_ID + LENGTH_OF_REV;

const PLACEHOLDER_TYPE_WRITER_SPEED = 33
const PLACEHOLDER_TEXT = ' <- Einfach tippen um tausende Parkerlaubnisse nach Kennzeichen, Namen, Parkplätzen und Co. zu durchsuchen.'

function searchAndShowPermissions() {

    filteredPermissions = []

    enableAdminArea(getSearchTexts().join(""));

    allPermissions.forEach(permission => {
        let rowFitsSearch = checkIfPermissionFitsAllSearchTexts(permission);
        if (rowFitsSearch) filteredPermissions.push(permission);
    })

    showPermission();
}

function showPermission() {
    displayPermissionsFilterResult();
    displayPermissionsFilterResultCount();
}

function getSearchTexts() {

    if (getSearchInputField() === null || getSearchInputField().value.trim() == "") {
        return [];
    } else {
        return getSearchInputField().value.trim().split(" ");
    }

}

function getSearchInputField() {
    return domGetElementViaId("searchInput");
}

function checkIfPermissionFitsAllSearchTexts(permission) {
    let result = true;

    if (getSearchTexts().length > 0) {
        getSearchTexts().forEach(searchText => {
            if (!permission.searchHash.toLowerCase().includes(searchText.toLowerCase()))
                result = false;
        })
    }

    return result;
}

function fetchAllPermissions() {

    domShowOrHideElement(NO_RESULT_FOUND_ELEMENT_ID, false);
    domShowOrHideElement(SPINNER_ELEMENT_ID, true);

    fetch('/search', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }

    }).then(function (res) {
        if (res.ok) return res.json();
        else throw new Error('Request failed.');

    }).then(function (data) {
        data.forEach(element => {
            allPermissions.push(element.doc)
        });

    }).then(() => {
        domShowOrHideElement(SPINNER_ELEMENT_ID, false);
        searchAndShowPermissions();
        typeWriter()

    }).catch(function (error) {
        console.log(error);
    });

}

function displayPermissionsFilterResultCount() {
    showResult(filteredPermissions.length);
}

function showResult(filteredPermissionsCount) {

    pollDOM();
    let resultCount = pollDOM();
    resultCount.textContent =
        getShowCount(filteredPermissionsCount) + " / " + filteredPermissionsCount + " Treffer";
}

function pollDOM() {
    const el = document.getElementById("resultCount");

    if (el !== null) {
        if (el !== undefined) {
            if (el.textContent !== undefined) {
                return el;
            }
        }
    } else {
        setTimeout(pollDOM, 1000); // try again in 300 milliseconds
    }
}

function getShowCount(filteredPermissionsCount) {
    return filteredPermissionsCount < SHOWN_ROWS_LIMIT ? filteredPermissionsCount : SHOWN_ROWS_LIMIT;
}

var i;
let placeholderText

function typeWriter() {

    if (i === undefined) {
        i = 0
        placeholderText = ""
    }

    if (i < PLACEHOLDER_TEXT.length) {

        let searchField = document.getElementById("searchInput");
        searchField.setAttribute("placeholder", placeholderText += PLACEHOLDER_TEXT.charAt(i))
        i++
        setTimeout(typeWriter, PLACEHOLDER_TYPE_WRITER_SPEED)
    }
}