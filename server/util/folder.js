const fs = require("fs")
var consts = require('../../globals.js');

const { folderIncoming, folderOutgoing, ftpFolderOutgoing } = require('../../config.js');

function createRessourcesFolder(folder) {
    fs.mkdir(folder, function (err) {
        if (err) {
            if(err.code==='EEXIST') {
                console.log("Folder already exists: '" + err.path)
            } else {
                console.log(err)
            }
        } else {
            console.log("New directory successfully created: '" + folder)
        }
    })
}

createRessourcesFolder(folderIncoming)
createRessourcesFolder(folderOutgoing)
createRessourcesFolder(ftpFolderOutgoing)

consts.parkingPlaces.forEach(parkingLot => {
    createRessourcesFolder(ftpFolderOutgoing + parkingLot)
})