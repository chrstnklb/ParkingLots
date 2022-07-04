const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'h3yxn7',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      let db = require("./apps/database/db.js");

      on("task", {
        deleteAllDbEntries() { return db.deleteAll(); },
        createDbEntry(entry) { return db.create(entry); },
        findDbEntry(id) { return db.getErlaubnis(id); },
      });
    },
  },
});
