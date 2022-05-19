var parkerlaubnis;
// var idOfActualEntry;

describe("Delete a Parkerlaubnis successful", () => {

    before(() => {

        // delete all entries
        cy.task("deleteAllDbEntries").should("equal", true);

        // add one entry
        cy.fixture('../fixtures/parkerlaubnis.json').then(function (data) {
            parkerlaubnis = data;
        }).then(() => {
            cy.task("createDbEntry", { entry: parkerlaubnis });
        });

    });

    it("visit homepage", () => {
        cy.visit("http://localhost:3000/");

        cy.spinnerIsVisible(true);
        cy.spinnerIsVisible(false);

        // check ui for entry

        // delete entry via ui
        cy.get('.deleteButton').click();
        cy.contains('VORSICHT! Dieser Eintrag wird DAUERHAFT gelöscht.');
        cy.contains("Löschen").click();
        cy.on("window:confirm", () => true);

        // check in database that entry is deleted

        // check in ui, that entry is deleted

    });
});
