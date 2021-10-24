
function generateDeleteButtons(id) {

    let button = document.createElement("button");

    button.setAttribute("id", "deleteButtonId" + id)
    button.setAttribute("class", "btn btn-sm btn-danger deleteButton bi bi-trash");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#deleteModal");
    button.setAttribute("title", "Löscht diesen Eintrag");
    button.addEventListener("click", function () { rememberIdOfEntryToDelete(id) });

    return button;
}

let wasDeleted = false;

function runStepsForSuccessfulPermissionDeletion() {
    hideDeleteModal();
    showDeleteConfirmation();
    refreshPage();
}

function hideDeleteModal() {
    $('#deleteModal').modal('hide');
}

function showDeleteConfirmation() {
    alert("Parkerlaubnis wurde " + (wasDeleted ? "erfolgreich" : "NICHT") + " gelöscht!");
    wasDeleted = false;
};

let idOfEntryToDelete = undefined;

function rememberIdOfEntryToDelete(entryId) {
    idOfEntryToDelete = entryId;
}

function deleteEntry(doDelete) {

    console.log("deleteEntry \n NOT YET IMPLEMENTED: Delete permission from database via fetch expressjs.")

    if (doDelete) {
        deletePermission(idOfEntryToDelete);
        undefineVariable(idOfEntryToDelete);
    } else {
        wasDeleted = false;
        hideDeleteModalWithAlert();
        showDeleteConfirmation();
    }
}

function hideDeleteModalWithAlert() {
    $('#deleteModal').modal('hide');
}

function undefineVariable(variableToUndefine) {
    variableToUndefine = undefined;
    return variableToUndefine;
}