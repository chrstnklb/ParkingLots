const CONST_TEST_STRING = "cyTest";

let personenDetails;
let fahrzeugDetails;

describe("Create new Parkerlaubniss successful", () => {
  before(() => {
    personenDetails = require("../../globals.js").personenDetails;
    fahrzeugDetails = require("../../globals.js").fahrzeugDetails;
    console.log("personenDetails :>> ", personenDetails);
    console.log("fahrzeugDetails :>> ", fahrzeugDetails);
  });

  it.only("visit homepage", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=pageLoadsSpinner]")
      .invoke("css", "display")
      .should("equal", "block");
    cy.get("[data-cy=pageLoadsSpinner]")
      .invoke("css", "display")
      .should("equal", "none");

    cy.get("[data-cy=navBar]")
      .should("be.visible")
      .get("[data-cy=createPermissionButton]")
      .contains("Neue Parkerlaubnis")
      .click();

    cy.get("[data-cy=createParkerlaubnisModalHeader]")
      .should("be.visible")
      .contains("Parkerlaubnis");

    cy.get("[data-cy=personenDetailsHeader]")
      .scrollIntoView()
      .should("be.visible")
      .contains("Personen Details");

    personenDetails.forEach((detail) => {
      cy.get("[data-cy=" + detail.toLowerCase() + "]")
        .should("be.visible")
        .should("have.attr", "placeholder", detail)
        .type(CONST_TEST_STRING + detail);
    });

    cy.get("[data-cy=fahrzeugDetailsHeader]")
      .scrollIntoView()
      .should("be.visible")
      .contains("Fahrzeug Details");

    fahrzeugDetails.forEach((detail) => {
      cy.get("[data-cy=" + detail.toLowerCase() + "]")
        .should("be.visible")
        .should("have.attr", "placeholder", detail)
        .type(CONST_TEST_STRING + detail);
    });

    cy.get("[data-cy=parkplaetzeHeader]")
      .scrollIntoView()
      .should("be.visible")
      .contains("Parkplätze");

    cy.get("[data-cy-parkinglot-checkbox=parking-space-a75]")
      .should("not.be.checked")
      .check();
    cy.get("[data-cy-parkinglot-label=parking-space-a75]")
      .should("be.visible")
      .contains("A75");

    cy.get("[data-cy=savePermission]").should("be.visible").click();

    const alertText =
      "\nParkerlaubnis für \n" +
      CONST_TEST_STRING +
      "Vorname " +
      CONST_TEST_STRING +
      "Nachname\nwurde ERFOLGREICH gespeichert!";

    cy.on("window:alert", (str) => {
      expect(str).to.equal(alertText);
    });

    cy.on("window:confirm", () => true); // accept the alert
  });
});
