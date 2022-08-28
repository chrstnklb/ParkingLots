const {
    ftpHostName,
    ftpPort,
    ftpUser,
    ftpAdmin,
    ftpFolderOutgoing,
    ftpPasvUrl,
    ftpPasvPortMin,
    ftpPasvPortMax
} = require('../../config.js');

const FtpSvr = require("ftp-srv");

const ftpServer = new FtpSvr({
    url: "ftp://" + ftpHostName + ":" + ftpPort,
    // pasv_url: ftpPasvUrl,
    // pasv_min: ftpPasvPortMin,
    // pasv_max: ftpPasvPortMax,
    // file_format: "ls",
    // anonymous: true,
    greeting: ["Hello user"],
});

ftpServer.on("login", (data, resolve, reject) => {
    if ((data.username === "anonymous") || (data.username === ftpUser && data.password === ftpAdmin)) {
        console.log("Successful login of " + data.username);

        data.connection.on("RETR", (error, filePath) => {
            console.log(`File ${filePath} was donwloaded.`);
        })

        data.connection.on("STOR", (error, filePath) => {
            console.log(`File ${filePath} was uploaded.`);
        })

        return resolve({ root: ftpFolderOutgoing });
    } else {
        console.log("reject");
        reject({});
    }
});

ftpServer.listen().then(() => {
    console.log(`Server Running at ftp://${ftpHostName}:${ftpPort}/`);
});
