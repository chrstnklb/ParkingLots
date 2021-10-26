let allPermissions = [];
let filteredPermissions;

const LENGTH_OF_ID = 13;
const LENGTH_OF_REV = 13;
const LENGTH_OF_ID_AND_REV = LENGTH_OF_ID + LENGTH_OF_REV;

function searchAndShowPermissions() {

    filteredPermissions = []

    allPermissions.forEach(permission => {
        let rowFitsSearch = checkIfPermissionFitsAllSearchTexts(permission);
        if (rowFitsSearch) filteredPermissions.push(permission);
    })

    showPermission();
}

function getFilteredPermissions() {
    return filteredPermissions
}

function showPermission() {
    displayPermissionsFilterResult();
    displayPermissionsFilterResultCount();
}

function getSearchTexts() {
    return getSearchInputField() === null
        ? []
        : getSearchInputField().value.trim().split(" ");
}

function getSearchInputField() {
    return domGetElementViaId("searchInput");
}

function checkIfPermissionFitsAllSearchTexts(permission) {
    let result = true;

    if (getSearchTexts().length > 0) {
        getSearchTexts().forEach(searchText => {
            if (!extractPermissionAsString(permission).toLowerCase().includes(searchText.toLowerCase()))
                result = false;
        })
    }
    return result;
}

function extractPermissionAsString(permission) {
    return Object.keys(permission).map(function (key) {
        return permission[key];
    }).join().replaceAll(",", "")
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
        getShowCount(filteredPermissionsCount) + " / " + filteredPermissionsCount;
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
