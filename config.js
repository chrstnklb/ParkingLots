const dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand')
var path = require('path');

// var myEnv = dotenv.config()
// var myEnv = dotenv.config({ path: path.join(__dirname, '.env'), debug: true })
var myEnv = dotenv.config({ path: path.join(__dirname, '.env') })

dotenvExpand(myEnv)
dotenv.config();

module.exports = {

    // APP-SERVER
    appUrl: process.env.APP_URL,
    appPort: process.env.APP_PORT,

    // MONITOR-APP-SERVER
    monitorAppUrl: process.env.MONITOR_APP_URL,
    monitorAppPort: process.env.MONITOR_APP_PORT,

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