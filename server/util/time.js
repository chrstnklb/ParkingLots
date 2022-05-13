const date = require('date-fns')

module.exports.getNowAsYYYYMMDD = function () {

    return date.format(new Date(), "yyyyLLdd")
}

module.exports.getNowAsHHMMSS = function () {

    return date.format(new Date(), "HHmmss")
}

// TODO: Umbau mittels date-fns
module.exports.createLetzteAenderung = function() {
    return new Date(Date.now()).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

module.exports.generateUniqueId = function() {
    return Date.now().toString();
}

module.exports.getTodayAsMs = function() {
    return this.generateUniqueId()
}