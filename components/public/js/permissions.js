// const permissionInformations = [
//     "Kennzeichen",
//     "Land",
//     "Bemerkung",
//     "Name",
//     "Vorname",
//     "Fahrzeug",
//     "Farbe",
//     "Unternehmen",
//     "Bereich",
//     "Telefon",
//     "Ergebnis"
// ];

// const parkingPlaces = [
//     "A75",
//     "Job Ticket",
//     "P1",
//     "P2",
//     "P3",
//     "P3 Erw",
//     "P4",
//     "P5",
//     "P6",
//     "Werk"
// ];

// const wantedInformations = [
//     "kennzeichen",
//     "land",
//     "name",
//     "vorname"
// ];

// // let filteredPermissions = [];

// // function getFilteredPermissions() {
// //     return filteredPermissions;
// // }

// // function setFilteredPermissions(permissions) {
// //     filteredPermissions = permissions;
// // }

// // function deleteFilteredPermissions() {
// //     filteredPermissions = [];
// // }

// function getIndexForPermissionInformation(demandedPermissionInformation) {
//     let indexOfDemandedPermissionInformation;
//     for (let informationIndex = 0; informationIndex < permissionInformations.length; informationIndex++) {
//         if (permissionInformations[informationIndex] === demandedPermissionInformation) {
//             indexOfDemandedPermissionInformation = informationIndex;
//             break;
//         }
//     }
//     return indexOfDemandedPermissionInformation;
// }

// function getIndexesForPermissionInformations(demandedPermissionInformations) {
//     let indexesOfDemandedPermissionInformations = [];
//     for (let informationIndex = 0; informationIndex < demandedPermissionInformations.length; informationIndex++) {
//         indexesOfDemandedPermissionInformations.push(getIndexForPermissionInformation(demandedPermissionInformations[informationIndex]));
//     }
//     return indexesOfDemandedPermissionInformations;
// }

// function addPermissionToFilteredPermissions(shouldDisplay, permission) {
//     if (shouldDisplay) {
//         filteredPermissions.push(permission);
//     }
// }

// function getNewId() {

//     let newId = 0;

//     loadDbToPermissionsArray();
//     for (let i = 0; i < allPermissionsArray.length; i++) {
//         let idToCheck = parseInt(allPermissionsArray[i].id);
//         if (idToCheck >= newId)
//             newId = idToCheck + 1;
//     }

//     return newId;
// }

// function createErlaubnis(id, row) {
//     return {
//         _id: String(id),

//         timestamp: Date.now().toString(),

//         name: row['Name'],
//         vorname: row['Vorname'],
//         unternehmen: row['Unternehmen'],
//         bereich: row['Bereich'],
//         telefon: row['Telefon'],
//         kennzeichen: row['Kennzeichen'],
//         land: row['Land'],
//         fahrzeug: row['Fahrzeug'],
//         farbe: row['Farbe'],
//         bemerkung: row['Bemerkung'],
//         parkplaetze: row['Ergebnis']
//     }
// }

// function getPermissionsFor(parkingSpace) {
//     let permissions = [];
//     let permissionsArray = getPermissionsArray();

//     permissionsArray.forEach(item => addPermission(parkingSpace, item));

//     function addPermission(parkingSpace, permission) {

//         let permissionParkingSpaceInformation = permission.doc["parkplaetze"];

//         if (isSubstringOf(parkingSpace, permissionParkingSpaceInformation))
//             permissions.push(permission);
//     }

//     return permissions;

// }

// function slicePermissionsToThisInformations(permissions) {
//     let slicedPermissions = [];
//     for (let permissionsIndex = 0; permissionsIndex < permissions.length; permissionsIndex++) {
//         let slicedPermission = "";

//         slicedPermission += permissions[permissionsIndex].doc["kennzeichen"].replace("-", "");
//         slicedPermission += ";";
//         slicedPermission += permissions[permissionsIndex].doc["land"];
//         slicedPermission += ";";
//         slicedPermission += permissions[permissionsIndex].doc["name"];
//         slicedPermission += ", ";
//         slicedPermission += permissions[permissionsIndex].doc["vorname"];
//         slicedPermission += "\n";

//         slicedPermissions.push(slicedPermission);
//     }
//     return slicedPermissions;
// }

// exports.parkingPlaces = parkingPlaces