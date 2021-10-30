const dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand(myEnv)
dotenv.config();

module.exports = {
    
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,

    dbUrl: process.env.DB_URL,

    folderIncoming: process.env.FOLDER_INCOMING,
    folderOutgoing: process.env.FOLDER_OUTGOING,
    
    ftpFolderOutgoing: process.env.FTP_FOLDER_OUTGOING
};