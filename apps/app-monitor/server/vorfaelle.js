const date = require('../../util/time');
const SPLIT_CHAR = '#';
const DEFAULT_DB_AUSSAGE = "keine Aussage";
const db = require("../../database/db");
const createObjectFromJsonFile = require('../../util/json.js').createObjectFromJsonFile;
const writeObjectToJsonFile = require('../../util/json.js').writeObjectToJsonFile;

module.exports.saveVorfall = async function (newVorfallRequest) {

    let knownVorfaelle = createObjectFromJsonFile('vorfaelle.json');
    let newVorfall = await createNewVorfall(newVorfallRequest);
    addNewVorfallToKnownVorfaelle(newVorfall, knownVorfaelle);
    writeObjectToJsonFile('vorfaelle.json', knownVorfaelle);
}

async function createNewVorfall(newVorfallRequest) {
    let kennzeichen = newVorfallRequest.split(SPLIT_CHAR)[1];
    return {
        kamera: newVorfallRequest.split(SPLIT_CHAR)[0],
        kennzeichen: kennzeichen,
        zeitpunkt: date.getNowAsHH_MM_SS(),
        dbAussage: await checkDbAussage(kennzeichen)
    }
}

function addNewVorfallToKnownVorfaelle(newVorfall, knownVorfaelle) {
    for (let key in knownVorfaelle) {
        if (newVorfall.kamera === key) {
            knownVorfaelle[key].kennzeichen = newVorfall.kennzeichen;
            knownVorfaelle[key].zeitpunkt = newVorfall.zeitpunkt;
            knownVorfaelle[key].dbAussage = newVorfall.dbAussage;
        }
    }
}

function checkDbAussage(kennzeichenFromVorfall) {

    return db.getAllPermissions().then(function (allParkerlaubnisse) {
        let result = "Hat keinerlei Parkerlaubnisse!";
        for (let i = 0; i < allParkerlaubnisse.rows.length; i++) {
            let kennZeichenFromParkerlaubnisse = simplifyKennzeichen(allParkerlaubnisse.rows[i].doc.kennzeichen);
            kennzeichenFromVorfall = simplifyKennzeichen(kennzeichenFromVorfall);
            if (kennZeichenFromParkerlaubnisse === kennzeichenFromVorfall) {
                result = `Hat Parkerlaubnisse für ${allParkerlaubnisse.rows[i].doc.parkplaetze.replaceAll('-', ' ')}`;
                break
            }
        }
        return result;
    }).catch(err => {
        console.log(err);
        return DEFAULT_DB_AUSSAGE;
    })
}

function simplifyKennzeichen(kennzeichen) {
    kennzeichen = kennzeichen.replace(/\s/g, '');
    kennzeichen = kennzeichen.replace('-', '');
    kennzeichen = kennzeichen.toUpperCase();
    return kennzeichen;
}