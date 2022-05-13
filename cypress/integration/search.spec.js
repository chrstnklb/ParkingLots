describe("check ui elements in 'result table'", () => {
  describe("check header ui elements in 'result table'", () => {
    it("checks header area", () => {
      cy.visit("http://localhost:3000/");

      cy.contains("Neue Parkerlaubnis");

      cy.wait(4000);
      cy.get("#searchInput").should(
        "have.attr",
        "placeholder",
        " <- Einfach tippen um tausende Parkerlaubnisse nach Kennzeichen, Namen, Parkplätzen und Co. zu durchsuchen."
      );

      cy.contains("Treffer");
    });
  });
});
