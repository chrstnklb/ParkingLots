function runStepsForSuccessfulPermissionCreation() {
    // console.log('Client received message from server, entry was successfully saved!');
    hideCreateModal();
    showCreateConfirmation(getVorname(), getNachname());
    deleteInputFieldsTexts();
    refreshPage();
}

function hideCreateModal() {
    $('#createPermissionModal').modal('hide');
}

function refreshPage() {
    location.reload();
}

function showCreateConfirmation(vorname, nachname) {
    alert('\nParkerlaubnis für \n' + vorname + ' ' + nachname + '\nwurde ERFOLGREICH gespeichert!');
}

// $(document).ready(function () {

//     $('#exampleModal').on('hidden.bs.modal', function () {
//         alert("Parkerlaubnis wurde " + (wasSaved ? "erfolgreich" : "NICHT") + " gespeichert!");
//         wasSaved = false;
//     })


//     $('#exampleModal').on('show.bs.modal', function (e) {

//         setKennzeichenFromSearchText();

//         e.relatedTarget.className.includes("editButton");
//         document.getElementById("savePermission").removeEventListener("click", updatePermission);
//         document.getElementById("savePermission").removeEventListener("click", createElementFromUi);

//         if (e.relatedTarget.className.includes("editButton")) {
//             document
//                 .getElementById("savePermission")
//                 .addEventListener("click", updatePermission);
//         } else { // createMode
//             document
//                 .getElementById("savePermission")
//                 .addEventListener("click", createElementFromUi);
//         }
//     })

// });

// function updatePermission() {
//     updateElement(grabInputFieldsForErlaubnis(true));
// }

// function createElementFromUi() {
//     createElementViaUi(grabInputFieldsForErlaubnis(false))
// }

