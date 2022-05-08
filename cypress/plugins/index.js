/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const { dbUrl } = require('../../config.js');
  console.log("teardown.js");
  console.log('dbUrl :>> ', dbUrl);
  
  var PouchDB = require("pouchdb");
  PouchDB.plugin(require("pouchdb-find"));
  
  const db = new PouchDB(dbUrl);
  
  on('task', {
    deleteAllDbEntries () {

      console.log("deleteAllDbEntries");
  
      db.allDocs({
        include_docs: true,
      })
        .then(function (result) {
          result.rows.forEach(function (doc) {
            db.remove(doc.doc);
            console.log('doc.doc :>> ', doc.doc);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
        return true
      },
    async "findDbEntry" () {
      let dbEntry;
      await db.allDocs({
        include_docs: true,
      })
        .then(function (result) {
          result.rows.forEach(function (doc) {
            dbEntry = doc.doc;
            console.log('doc.doc :>> ', doc.doc);
            return dbEntry;
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      return true;
    }
  })
}
