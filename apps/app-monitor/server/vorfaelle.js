const date = require('../../util/time');
const fs = require('fs');
const SPLIT_CHAR = '#';

module.exports.saveVorfall = function (vorfallRequest) {

    let vorfaelle = {
        P1: { zeitpunkt: '', kennzeichen: '' },
        P2: { zeitpunkt: '', kennzeichen: '' },
        P3: { zeitpunkt: '', kennzeichen: '' },
        P4: { zeitpunkt: '', kennzeichen: '' },
        P5: { zeitpunkt: '', kennzeichen: '' },
        P6: { zeitpunkt: '', kennzeichen: '' },
    }

    let vorfaelleFromFile = JSON.parse(fs.readFileSync('vorfaelle.json', 'utf8'));

    for (let key in vorfaelleFromFile) {
        if (key in vorfaelle) {
            vorfaelle[key].kennzeichen = vorfaelleFromFile[key].kennzeichen;
            vorfaelle[key].zeitpunkt = vorfaelleFromFile[key].zeitpunkt;
        }
    }

    let vorfaelleEntry = {
        kamera: vorfallRequest.split(SPLIT_CHAR)[0],
        kennzeichen: vorfallRequest.split(SPLIT_CHAR)[1],
        zeitpunkt: date.getNowAsHH_MM_SS()
    }

    // add vorfaelleEntry to vorfaelle if kamera matches one of the keys
    for (let key in vorfaelle) {
        if (vorfaelleEntry.kamera === key) {
            console.log("🚀 ~ file: vorfaelle.js ~ line 25 ~ key", key)
            vorfaelle[key].kennzeichen = vorfaelleEntry.kennzeichen;
            vorfaelle[key].zeitpunkt = vorfaelleEntry.zeitpunkt;
        }
    }

    // write vorfaelle to json file named vorfaelle.json
    fs.writeFileSync('vorfaelle.json', JSON.stringify(vorfaelle));

}

module.exports.readVorfaelle = function (parkplatz) {

    // read all vorfaelle from json file named vorfaelle.json
    return JSON.parse(fs.readFileSync('../../app-schranke/vorfaelle.json', 'utf8'));


}

