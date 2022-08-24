const date = require('date-fns')

module.exports.getNowAsYYYYMMDD = function () {

    return date.format(new Date(), "yyyyLLdd")
}

module.exports.getNowAsHHMMSS = function () {

    return date.format(new Date(), "HHmmss")
}

module.exports.getNowAsHH_mm_ss = function () {

    return date.format(new Date(), "HH:mm:ss")
}

module.exports.getNowAsdd_LL_yyyy = function () {
    return date.format(new Date(), "dd.LL.yyyy")
}