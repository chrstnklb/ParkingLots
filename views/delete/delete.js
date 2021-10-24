
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

function hideCreateModal() {
    $('#createPermissionModal').modal('hide');
}


$('#deleteModal').on('hidden.bs.modal', function () {
    alert("Parkerlaubnis wurde " + (wasDeleted ? "erfolgreich" : "NICHT") + " gelöscht!");
    wasDeleted = false;
})

function hideDeleteModalWithAlert() {
    $('#deleteModal').modal('hide');
}


let idOfEntryToDelete = undefineVariable;

function rememberIdOfEntryToDelete(entryId) {
    idOfEntryToDelete = entryId;
}

function deleteEntry(doDelete) {

    alert("deleteEntry \n NOT YET IMPLEMENTED: Delete permission from database via fetch expressjs.")

    // if (doDelete) {
    //     deleteElementFromDb(idOfEntryToDelete);
    //     undefineVariable(idOfEntryToDelete);
    // } else {
    //     wasDeleted = false;
    //     hideDeleteModalWithAlert();
    // }
}

function undefineVariable(variableToUndefine) {
    variableToUndefine = undefined;
    return variableToUndefine;
}