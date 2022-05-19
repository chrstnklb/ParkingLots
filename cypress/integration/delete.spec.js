var parkerlaubnis;

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

        // delete entry via ui

        // cy.on("window:alert", (str) => {
        //   expect(str).to.equal(alertText);
        // });

        // cy.on("window:confirm", () => true); // accept the alert

        // check in database that entry is deleted
        // check in ui, that entry is deleted
    });
});
