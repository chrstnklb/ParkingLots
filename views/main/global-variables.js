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

//TODO: Der scheint hier aber sehr spezifisch zu sein - löschbar?
let ID_OF_ACTUAL_ENTRY;

function setIdOfEntryToEdit(id) {
    ID_OF_ACTUAL_ENTRY = id;
}