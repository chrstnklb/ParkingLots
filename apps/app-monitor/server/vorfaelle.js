const date = require('../../util/time');
const SPLIT_CHAR = '#';
const DEFAULT_DB_AUSSAGE = "keine Aussage";
const db = require("../../database/db");
const createObjectFromJsonFile = require('../../util/json.js').createObjectFromJsonFile;
const writeObjectToJsonFile = require('../../util/json.js').writeObjectToJsonFile;

module.exports.saveVorfall = async function (newVorfallRequest) {

    let knownVorfaelle = createObjectFromJsonFile('../app-schranke/vorfaelle.json');
    let newVorfall = await createNewVorfall(newVorfallRequest);
    addNewVorfallToKnownVorfaelle(newVorfall, knownVorfaelle);
    writeObjectToJsonFile('../app-schranke/vorfaelle.json', knownVorfaelle);
}

async function createNewVorfall(newVorfallRequest) {
    let kennzeichen = newVorfallRequest.split(SPLIT_CHAR)[1];
    let parkerlaubnisInfo = await getParkerlaubnisInfo(kennzeichen);
    let vorfall = {
        kamera: newVorfallRequest.split(SPLIT_CHAR)[0],
        zeitpunkt: date.getNowAsdd_LL_yyyy(),
        kennzeichen: kennzeichen,
        vorname: parkerlaubnisInfo.vorname,
        nachname: parkerlaubnisInfo.nachname,
    }
    console.log("🚀 ~ file: vorfaelle.js ~ line 26 ~ createNewVorfall ~ vorfall", vorfall)

    return {
        kamera: newVorfallRequest.split(SPLIT_CHAR)[0],
        zeitpunkt: date.getNowAsHH_mm_ss(),
        // dbAussage: await getParkerlaubnisInfo(kennzeichen),
        kennzeichen: parkerlaubnisInfo.kennzeichen,
        vorname: parkerlaubnisInfo.vorname,
        nachname: parkerlaubnisInfo.nachname
    }
}

function addNewVorfallToKnownVorfaelle(newVorfall, knownVorfaelle) {
    console.log("🚀 ~ file: vorfaelle.js ~ line 30 ~ addNewVorfallToKnownVorfaelle ~ knownVorfaelle", knownVorfaelle)
    console.log("🚀 ~ file: vorfaelle.js ~ line 30 ~ addNewVorfallToKnownVorfaelle ~ newVorfall", newVorfall)

    for (let key in knownVorfaelle) {
        if (newVorfall.kamera === key) {
            knownVorfaelle[key].kamera = newVorfall.kamera;
            knownVorfaelle[key].zeitpunkt = newVorfall.zeitpunkt;
            knownVorfaelle[key].kennzeichen = newVorfall.kennzeichen;
            knownVorfaelle[key].vorname = newVorfall.vorname;
            knownVorfaelle[key].nachname = newVorfall.nachname;
        }
    }
}

function getParkerlaubnisInfo(kennzeichenFromVorfall) {

    return db.getAllPermissions().then(function (allParkerlaubnisse) {
        let result = "Hat keinerlei Parkerlaubnisse!";
        for (let i = 0; i < allParkerlaubnisse.rows.length; i++) {
            // kennZeichenFromParkerlaubnisse = allParkerlaubnisse.rows[i].doc.kennzeichen;
            let simplifiedKennzeichenFromParkerlaubnisse = simplifyKennzeichen(allParkerlaubnisse.rows[i].doc.kennzeichen);
            kennzeichenFromVorfall = simplifyKennzeichen(kennzeichenFromVorfall);
            if (simplifiedKennzeichenFromParkerlaubnisse === kennzeichenFromVorfall) {
                // result = `Hat Parkerlaubnisse für ${allParkerlaubnisse.rows[i].doc.parkplaetze.replaceAll('-', ' ')}`;
                result = allParkerlaubnisse.rows[i].doc;
                console.log("🚀 ~ file: vorfaelle.js ~ line 52 ~ result", result)
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