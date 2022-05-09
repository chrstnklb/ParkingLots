const fs = require("fs")

const { folderIncoming, folderOutgoing, ftpFolderOutgoing } = require('../../config.js');

const globals = require('../../globals.js');

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

globals.parkingPlaces.forEach(parkingLot => {
    createRessourcesFolder(ftpFolderOutgoing + parkingLot)
})