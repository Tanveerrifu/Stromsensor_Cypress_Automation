describe("Testing Download File", () => {
  it("should check download", () => {
    cy.readFile("cypress/downloads/template_nutzerdaten.xlsx");
  });
});
