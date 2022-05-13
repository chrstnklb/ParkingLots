// TODO: expliziter zugriff dank export

const parkingPlaces = [
    "A75",
    "Job Ticket",
    "P1",
    "P2",
    "P3",
    "P3 Erw",
    "P4",
    "P5",
    "P6",
    "Werk"
];

let insertMode;

let ID_OF_ACTUAL_ENTRY;

function setIdOfEntryToEdit(id) {
    ID_OF_ACTUAL_ENTRY = id;
}

const NO_RESULT_FOUND_ELEMENT_ID = "noResult";

const SPINNER_ELEMENT_ID = "spinner";