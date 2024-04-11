describe("home page", () => {
  it("should redirect to /calendar/month", () => {
    cy.visit("/");

    cy.url().should("contain", "/calendar/month");
  });
});
