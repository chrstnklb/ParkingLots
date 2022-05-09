const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const {dbUrl} = require("../../config.js");

// const db = new PouchDB(dbUrl);

// The one and only database connection
function getDbConnection() {
    if(!db) {
        db = new PouchDB(dbUrl);
    }
    return db;
}
