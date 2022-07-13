const date = require('../../util/time');
const fs = require('fs');
const SPLIT_CHAR = '#';
const DEFAULT_DB_AUSSAGE = "keine Aussage möglich";

module.exports.saveVorfall = function (newVorfallRequest) {

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
    let newVorfall = {
        kamera: newVorfallRequest.split(SPLIT_CHAR)[0],
        kennzeichen: newVorfallRequest.split(SPLIT_CHAR)[1],
        zeitpunkt: date.getNowAsHH_MM_SS(),
        dbAussage: "keine Aussage möglich"
        // dbAussage: checkDbAussage(newVorfallRequest.split(SPLIT_CHAR)[1])
    }

    // add vorfaelleEntry to vorfaelle if kamera matches one of the keys
    for (let key in knownVorfaelle) {
        if (newVorfall.kamera === key) {
            knownVorfaelle[key].kennzeichen = newVorfall.kennzeichen;
            knownVorfaelle[key].zeitpunkt = newVorfall.zeitpunkt;
            knownVorfaelle[key].dbAussage = newVorfall.dbAussage;
        }
    }

    // write vorfaelle to json file named vorfaelle.json
    fs.writeFileSync('vorfaelle.json', JSON.stringify(knownVorfaelle));

}

async function checkDbAussage(kennzeichen) {
    const db = require('../../database/db.js');

    // get all parkerlaubnisse from database
    await db.search().then(parkerlaubnisse => {

        let result = "Kennzeichen ist keinen Parkplätzen zugeordnet";

        // check if kennzeichen is in parkerlaubnisse
        for (let i = 0; i < parkerlaubnisse.length; i++) {

            dbKennzeichen = parkerlaubnisse[i].doc.kennzeichen;
            dbKennzeichen = dbKennzeichen.replace(/\s/g, '');
            dbKennzeichen = dbKennzeichen.replace('-', '');
            dbKennzeichen = dbKennzeichen.toUpperCase();

            kennzeichen = kennzeichen.replace(/\s/g, '');
            kennzeichen = kennzeichen.replace('-', '');
            kennzeichen = kennzeichen.toUpperCase();

            if (dbKennzeichen === kennzeichen) {
                result = parkerlaubnisse[i].doc.parkplaetze;
                break;
            }
        }
        return result;
    }).then(result => {
        return result;
    }).catch(err => {
        console.log("error", err)
        return "keine Aussgae möglich";
    });
}




module.exports.readVorfaelle = function () {
    JSON.parse(fs.readFileSync('../../app-schranke/vorfaelle.json', 'utf8'));
    // read all vorfaelle from json file named vorfaelle.json
    return JSON.parse(fs.readFileSync('../../app-schranke/vorfaelle.json', 'utf8'));


}

