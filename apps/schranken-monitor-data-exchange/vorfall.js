const date = require('../util/time');

const vorfaelle = [];
const SPLIT_CHAR = '#';

class Vorfall {
    constructor(request) {
        this.kamera = request.split(SPLIT_CHAR)[0];
        this.kennzeichen = request.split(SPLIT_CHAR)[1];
        this.timestamp = date.getNowAsHH_MM_SS();
    }
}

module.exports.createVorfall = function (vorfallRequest) {
    const vorfall = new Vorfall(vorfallRequest);
    vorfaelle.push(vorfall);
    console.log(`Vorfaelle: ${JSON.stringify(vorfaelle)}`);
}

// function addVorfaelle(vorfall) {
//     vorfaelle.push(vorfall);
//     console.log("🚀 ~ file: vorfall.js ~ line 5 ~ addVorfaelle ~ vorfaelle", vorfaelle)
// }

// function getVorfaelle() {
//     return vorfaelle;
// }

// function deleteVorfall(kamera) {

// }