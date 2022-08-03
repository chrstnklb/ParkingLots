const date = require('../../util/time');
const fs = require('fs');
const SPLIT_CHAR = '#';
const DEFAULT_DB_AUSSAGE = "keine Aussage";
// const search = require('../../database/db.js').search;
const db = require("../../database/db");

module.exports.saveVorfall = async function (newVorfallRequest) {

    let knownVorfaelle = {
        P1: { zeitpunkt: '', kennzeichen: '', dbAussage: DEFAULT_DB_AUSSAGE },
        P3: { zeitpunkt: '', kennzeichen: '', dbAussage: DEFAULT_DB_AUSSAGE },
        P2: { zeitpunkt: '', kennzeichen: '', dbAussage: DEFAULT_DB_AUSSAGE },
        P4: { zeitpunkt: '', kennzeichen: '', dbAussage: DEFAULT_DB_AUSSAGE },
        P5: { zeitpunkt: '', kennzeichen: '', dbAussage: DEFAULT_DB_AUSSAGE },
        P6: { zeitpunkt: '', kennzeichen: '', dbAussage: DEFAULT_DB_AUSSAGE },
    }

    let vorfaelleFromFile = JSON.parse(fs.readFileSync('vorfaelle.json', 'utf8'));

    // read vorfaelle from file
    for (let key in vorfaelleFromFile) {
        if (key in knownVorfaelle) {
            knownVorfaelle[key].kennzeichen = vorfaelleFromFile[key].kennzeichen;
            knownVorfaelle[key].zeitpunkt = vorfaelleFromFile[key].zeitpunkt;
            knownVorfaelle[key].dbAussage = vorfaelleFromFile[key].dbAussage;
        }
    }

    // extract data from request
    let newVorfall = await createNewVorfall(newVorfallRequest);
    console.log("🚀 ~ file: vorfaelle.js ~ line 32 ~ newVorfall", newVorfall)

    // add vorfaelleEntry to vorfaelle if kamera matches one of the keys
    for (let key in knownVorfaelle) {
        if (newVorfall.kamera === key) {
            knownVorfaelle[key].kennzeichen = newVorfall.kennzeichen;
            knownVorfaelle[key].zeitpunkt = newVorfall.zeitpunkt;
            knownVorfaelle[key].dbAussage = newVorfall.dbAussage;
        }
    }

    // write vorfaelle to json file named vorfaelle.json
    console.log("🚀 ~ file: vorfaelle.js ~ line 46 ~ knownVorfaelle", knownVorfaelle)
    fs.writeFileSync('vorfaelle.json', JSON.stringify(knownVorfaelle));
}

async function createNewVorfall(newVorfallRequest) {
    let aussage = await checkDbAussage(newVorfallRequest.split(SPLIT_CHAR)[1]);
    console.log("🚀 ~ file: vorfaelle.js ~ line 49 ~ createNewVorfall ~ aussage", aussage)

    return {
        kamera: newVorfallRequest.split(SPLIT_CHAR)[0],
        kennzeichen: newVorfallRequest.split(SPLIT_CHAR)[1],
        zeitpunkt: date.getNowAsHH_MM_SS(),
        dbAussage: aussage
    }
}

function checkDbAussage(kennzeichen) {

    return db.searchResult().then(function (allEntries) {

        for (let i = 0; i < allEntries.rows.length; i++) {

            dbKennzeichen = allEntries.rows[i].doc.kennzeichen;
            dbKennzeichen = dbKennzeichen.replace(/\s/g, '');
            dbKennzeichen = dbKennzeichen.replace('-', '');
            dbKennzeichen = dbKennzeichen.toUpperCase();

            kennzeichen = kennzeichen.replace(/\s/g, '');
            kennzeichen = kennzeichen.replace('-', '');
            kennzeichen = kennzeichen.toUpperCase();

            if (dbKennzeichen === kennzeichen) {
                console.log("inside if")
                return `Hat Parkerlaubnisse für ${allEntries.rows[i].doc.parkplaetze}`;
            }
            return "Hat keinerlei Parkerlaubnisse!";
        }
    }).then(function (result) {
        console.log("🚀 ~ file: vorfaelle.js ~ line 81 ~ result", result)
        return result;
    }).catch(err => {
        console.log("🚀 ~ file: vorfaelle.js ~ line 88 ~ checkDbAussage ~ err", err)
    })
}

module.exports.readVorfaelle = function (filePath) {
    // read all vorfaelle from json file named vorfaelle.json
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}