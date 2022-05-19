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

        // delete entry
        // cy.get(`[data-cy=${actId}]`).click();

        // cy.on("window:alert", (str) => {
        //     expect(str).to.equal('VORSICHT! Dieser Eintrag wird DAUERHAFT gelöscht.');
        // });

        // cy.on("window:confirm", () => true); // accept the alert

        // cy.spinnerIsVisible(true);
        // cy.spinnerIsVisible(false);

        // check in database that entry is deleted
        // cy.task("findDbEntry").then((dbEntry) => {
        //     expect(dbEntry).to.be.null;
        // });

        // check in ui, that entry is deleted

    });
});
