const date = require('date-fns')

module.exports.getNowAsYYYYMMDD = function () {

    return date.format(new Date(), "yyyyLLdd")
}

module.exports.getNowAsHHMMSS = function () {

    return date.format(new Date(), "HHmmss")
}

module.exports.getNowAsHH_MM_SS = function () {

    return date.format(new Date(), "HH:mm:ss")
}

module.exports.createLetzteAenderung = function () {
    return date.format(new Date(), "dd.LL.yyyy")
}