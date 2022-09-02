const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand')
const path = require('path');

const myEnv = dotenv.config({ path: path.join(__dirname, '.env') })

dotenvExpand(myEnv)
dotenv.config();

module.exports = {

    // APP-SERVER
    appUrl: process.env.APP_URL,
    appPort: process.env.APP_PORT,

    // MONITOR-APP
    // SCHRANKE-APP
    monitorAppUrl: process.env.MONITOR_APP_URL,
    monitorAppPort: process.env.MONITOR_APP_PORT,
    monitorAppVorfaelle: process.env.MONITOR_APP_VORFAELLE,

    schrankenAppIp: process.env.SCHRANKEN_APP_IP,
    schrankenAppPort: process.env.SCHRANKEN_APP_PORT,
    schrankenAppVorfaelle: process.env.SCHRANKEN_APP_VORFAELLE,

    // DB
    dbUrl: process.env.DB_URL,

    // APP
    folderIncoming: process.env.FOLDER_INCOMING,
    folderOutgoing: process.env.FOLDER_OUTGOING,

    // FTP SERVER
    ftpFolderOutgoing: process.env.FTP_FOLDER_OUTGOING,

    // EXCEL
    excelFolder: process.env.EXCEL_FOLDER,

    // CRON JOB
    cronTime: process.env.CRON_TIME
};