function write(filename, extension, data_s, encoding, preLogMessage) {
    let fs = require('fs');

    let fullFileName = filename + "." + extension

    fs.writeFile(fullFileName, data_s, encoding, function(err) {
        if (err)
            return console.log(err);
        console.log('Wrote' + preLogMessage + fullFileName);
    });
}

exports.write = write