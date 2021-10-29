const dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand(myEnv)
dotenv.config();

module.exports = {

    folderIncoming: process.env.FOLDER_INCOMING,
    folderOutgoing: process.env.FOLDER_OUTGOING,
    
    appPort: process.env.APP_PORT,
    appUrl: process.env.APP_URL,
    
    dbUrl: process.env.DB_URL
};