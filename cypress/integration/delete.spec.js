const { fillUpFieldsForParkerlaubnis } = require("../../server/db/db-utils");

let parkerlaubnis;
let parkerlaubnisId;

describe("Delete a Parkerlaubnis successful", () => {

    before(() => {

        // delete all entries
        cy.task("deleteAllDbEntries").should("equal", true);

        // add one entry
        cy.fixture('../fixtures/parkerlaubnis.json')
            .then((data) => { parkerlaubnis = data; });

    });

    it("visit homepage", () => {

        cy.task("createDbEntry", parkerlaubnis).then((result) => {

            parkerlaubnisId = result.id;

            cy.visit("http://localhost:3000/");

            // delete entry via ui
            cy.get('.deleteButton').click();
            cy.contains('VORSICHT! Dieser Eintrag wird DAUERHAFT gelöscht.');
            cy.contains("Löschen").click();
            cy.on("window:confirm", () => true);

            // check in ui, that entry is deleted
            cy.get('.deleteButton').should('not.exist');

        });

        // check in database that entry is deleted
        cy.task("findDbEntry", parkerlaubnisId).then((result) => {
            expect(result.docId).equals("undefined");
            expect(result.error).equals("not_found");
            expect(result.status).equals(404);
        });
    });
});