const date = require('../../util/time');
const SPLIT_CHAR = '#';
const DEFAULT_DB_AUSSAGE = "keine Aussage";
const db = require("../../database/db");
const createObjectFromJsonFile = require('../../util/json.js').createObjectFromJsonFile;
const writeObjectToJsonFile = require('../../util/json.js').writeObjectToJsonFile;

let kennZeichenFromParkerlaubnisse = '';

module.exports.saveVorfall = async function (newVorfallRequest) {

    let knownVorfaelle = createObjectFromJsonFile('./apps/app-schranke/vorfaelle.json');
    let newVorfall = await createNewVorfall(newVorfallRequest);
    addNewVorfallToKnownVorfaelle(newVorfall, knownVorfaelle);
    writeObjectToJsonFile('./apps/app-schranke/vorfaelle.json', knownVorfaelle);
}

async function createNewVorfall(newVorfallRequest) {
    let kennzeichen = newVorfallRequest.split(SPLIT_CHAR)[1];
    return {
        kamera: newVorfallRequest.split(SPLIT_CHAR)[0],
        zeitpunkt: date.getNowAsHH_mm_ss(),
        dbAussage: await checkDbAussage(kennzeichen),
        kennzeichen: kennZeichenFromParkerlaubnisse
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
            kennZeichenFromParkerlaubnisse = allParkerlaubnisse.rows[i].doc.kennzeichen;
            let simplifiedKennzeichenFromParkerlaubnisse = simplifyKennzeichen(allParkerlaubnisse.rows[i].doc.kennzeichen);
            kennzeichenFromVorfall = simplifyKennzeichen(kennzeichenFromVorfall);
            if (simplifiedKennzeichenFromParkerlaubnisse === kennzeichenFromVorfall) {
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