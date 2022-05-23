'use strict';

const dbUtils = require('../../server/db/db-utils.js');

let parkerlaubnis;

describe("Table Test", () => {

    before(() => {

        // delete all entries
        cy.task("deleteAllDbEntries").should("equal", true);

        // add one entry
        cy.fixture('../fixtures/parkerlaubnis.json').then(function (data) {
            parkerlaubnis = dbUtils.fillUpFieldsForParkerlaubnis(data);

        }).then(() => {
            cy.task("createDbEntry", { entry: parkerlaubnis });
        });
    });

    beforeEach(() => {

        cy.visit("http://localhost:3000/");
    });

    it("check table header exists with correct order", () => {

        cy.get('table[id="resultTableId"]>thead>tr>th').as('header-row');

        cy.get('@header-row').eq(0).should('contain', 'Aktionen');
        cy.get('@header-row').eq(1).should('contain', 'Kennzeichen');
        cy.get('@header-row').eq(2).should('contain', 'Land');
        cy.get('@header-row').eq(3).should('contain', 'Bemerkung');
        cy.get('@header-row').eq(4).should('contain', 'Nachname');
        cy.get('@header-row').eq(5).should('contain', 'Vorname');
        cy.get('@header-row').eq(6).should('contain', 'Fahrzeug');
        cy.get('@header-row').eq(7).should('contain', 'Farbe');
        cy.get('@header-row').eq(8).should('contain', 'Unternehmen');
        cy.get('@header-row').eq(9).should('contain', 'Bereich');
        cy.get('@header-row').eq(10).should('contain', 'Telefon');
        cy.get('@header-row').eq(11).should('contain', 'Parkplätze');
        cy.get('@header-row').eq(12).should('contain', 'Letzte Änderung');

    });

    it("check table row content exists with correct order", () => {

        // check existance of delete button

        cy.get('table[id="resultTableId"]>tbody>tr>td').as('data-row');

        cy.get('@data-row').eq(1).should('contain', parkerlaubnis.kennzeichen);
        cy.get('@data-row').eq(2).should('contain', parkerlaubnis.land);
        cy.get('@data-row').eq(3).should('contain', parkerlaubnis.bemerkung);
        cy.get('@data-row').eq(4).should('contain', parkerlaubnis.nachname);
        cy.get('@data-row').eq(5).should('contain', parkerlaubnis.vorname);
        cy.get('@data-row').eq(6).should('contain', parkerlaubnis.fahrzeug);
        cy.get('@data-row').eq(7).should('contain', parkerlaubnis.farbe);
        cy.get('@data-row').eq(8).should('contain', parkerlaubnis.unternehmen);
        cy.get('@data-row').eq(9).should('contain', parkerlaubnis.bereich);
        cy.get('@data-row').eq(10).should('contain', parkerlaubnis.telefon);
        cy.get('@data-row').eq(11).should('contain', parkerlaubnis.parkplaetze);
        cy.get('@data-row').eq(12).should('contain', parkerlaubnis.letzteAenderung);

        // check existance of edit button

        // check entry in table

        // NEW TEST
        // check especially days since creation

        // NEW TEST
        // check entry in table via mouse hover effect
    });

});
