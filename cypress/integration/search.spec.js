describe("check ui elements in 'result table'", () => {
  describe("check header ui elements in 'result table'", () => {
    it("checks header area", () => {
      cy.visit("http://localhost:3000/");

      cy.spinnerIsVisible(true);
      cy.spinnerIsVisible(false);

      cy.contains("Neue Parkerlaubnis");

      cy.wait(4000);
      cy.get("#searchInput").should(
        "have.attr",
        "placeholder",
        " <- Einfach tippen um tausende Parkerlaubnisse nach Kennzeichen, Namen, Parkplätzen und Co. zu durchsuchen."
      );

      cy.contains("Treffer");
    });
    it('checks hint when nothing was found', () => {
      // cy.visit("http://localhost:3000/");
      // cy.get("#searchInput").type("asdf");
      // cy.contains("Keine Treffer gefunden");
    });
    it('checks treffer when nothing was found', () => {
      // cy.visit("http://localhost:3000/");
      // cy.get("#searchInput").type("asdf");
      // cy.contains("0 / 1 Treffer");
    });
  });
});
