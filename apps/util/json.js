const fs = require('fs');

module.exports.createObjectFromJsonFile = function (filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports.writeObjectToJsonFile = function (filePath, object) {
    fs.writeFileSync(filePath, JSON.stringify(object));
}