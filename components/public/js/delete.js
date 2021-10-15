
function generateDeleteButtons(id) {

    let button = document.createElement("button");

    button.setAttribute("id", "deleteButtonId" + id)
    button.setAttribute("class", "btn btn-sm btn-danger deleteButton glyphicon glyphicon-trash");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#deleteModal");
    button.setAttribute("title", "Löscht diesen Eintrag");
    button.addEventListener("click", function() {rememberIdOfEntryToDelete(id)});

    return button;

}

let wasDeleted = false;

$(document).ready(function() {

    $('#deleteModal').on('hidden.bs.modal', function () {
        alert("Parkerlaubnis wurde " + (wasDeleted ? "erfolgreich" : "NICHT") + " gelöscht!");
        wasDeleted = false;
    })
});

function hideDeleteModalWithAlert() {
    $('#deleteModal').modal('hide');
}


let idOfEntryToDelete = undefineVariable;

function rememberIdOfEntryToDelete(entryId){
    idOfEntryToDelete = entryId;
}

function deleteEntry(doDelete){
    if(doDelete) {
        deleteElementFromDb(idOfEntryToDelete);
        undefineVariable(idOfEntryToDelete);
    } else {
		wasDeleted = false;
        hideDeleteModalWithAlert();
    }
}

function undefineVariable(variableToUndefine){
    variableToUndefine = undefined;
    return variableToUndefine;
}