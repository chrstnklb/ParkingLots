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

    let db = require("../../server/db/db.js");

    on("task", {
        deleteAllDbEntries() {
            db.deleteAll();
            return true;
        },

        createDbEntry(entry) {
            db.create(entry.entry);
            return true;
        },

        findDbEntry() {
            db.getErlaubnis({
                include_docs: true,
            }).then(function (result) {
                result.rows.forEach(function (doc) {
                    return doc.doc;
                });
            }).catch(function (err) {
                console.log(err);
            });

            return true;
        },

    });
};