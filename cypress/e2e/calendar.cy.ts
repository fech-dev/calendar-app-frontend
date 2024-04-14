describe("/calendar", () => {
  it('should redirect to 404 page if invalid "view type" given', () => {
    cy.visit("/calendar/invalid");
    cy.contains("404").should("exist");
  });

  it("should redirect to /calendar/month", () => {
    cy.visit("/calendar");

    cy.url().should("contain", "/calendar/month");
  });

  it('should redirect to /events/create page when user clicks on "Create Event" button', () => {
    cy.visit("/calendar");

    cy.contains("Create Event").click();

    cy.url().should("contain", "/events/create");
  });

  describe("Month view", () => {
    beforeEach(() => {
      cy.visit("/calendar/month");
    });

    it("should load events on load", () => {
      cy.fixture("events/get-all-month.json").then((events) => {
        cy.intercept(
          {
            url: "/events",
            method: "GET",
            query: {
              datesRange: JSON.stringify([
                "2024-04-01 00:00:00",
                "2024-05-01 00:00:00",
              ]),
            },
          },
          events
        ).as("getEvents");

        cy.wait("@getEvents");
      });
    });

    it("should load events on month change");
  });

  describe("Events", () => {
    it("should go to /events/:id page when user clicks on event");
  });
});
