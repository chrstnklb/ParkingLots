const fs = require('fs');
const path = require('path');
//const console = require('./log.js');

module.exports.createObjectFromJsonFile = function (filePath) {
    return JSON.parse(
        fs.readFileSync(
            path.join(process.cwd()) + filePath,
            'utf8'));
}

module.exports.writeObjectToJsonFile = function (filePath, object) {
    fs.writeFileSync(
        path.join(process.cwd()) + filePath,
        JSON.stringify(object));
}