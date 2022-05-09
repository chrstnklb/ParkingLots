const dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand(myEnv)
dotenv.config();

module.exports = {
    
    // APP
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,

    // DB
    dbUrl: process.env.DB_URL,

    // APP
    folderIncoming: process.env.FOLDER_INCOMING,
    folderOutgoing: process.env.FOLDER_OUTGOING,
    
    // FTP SERVER
    ftpHostName: process.env.FTP_HOST_NAME,
    ftpPort: process.env.FTP_PORT,
    ftpPasvUrl: process.env.FTP_PASV_URL,

    ftpUser: process.env.FTP_USER,
    ftpAdmin: process.env.FTP_ADMIN,

    ftpFolderOutgoing: process.env.FTP_FOLDER_OUTGOING,
    
    ftpPasvPortMin: process.env.FTP_PASV_PORT_MIN,
    ftpPasvPortMax: process.env.FTP_PASV_PORT_MAX,
    
    // EXCEL
    excelFolder: process.env.EXCEL_FOLDER,
    
    // CRON JOB
    cronTime: process.env.CRON_TIME
};