context("Search", () => {
  it("should be able to render the input and give value to it. and then to search for the received value when clicking the button", () => {
    cy.visit("http://localhost:3000/");

    cy.viewport(1440, 900);

    cy.get("input").type(88010000);

    cy.get(".primary").click();

    cy.get(":nth-child(1) > .fluid > input").should(
      "have.value",
      "Rua Felipe Schmidt"
    );
    cy.get(":nth-child(3) > .fluid > input").should("have.value", "Centro");

    cy.get(".form > :nth-child(4) > .fluid > input").should(
      "have.value",
      "Florianópolis"
    );
    cy.get(":nth-child(5) > .fluid > input").should("have.value", "SC");
  });

  it("should be able to render an error if input is invalid", () => {
    cy.visit("http://localhost:3000/");

    cy.viewport(1440, 900);

    cy.get("input").type(3124131);

    cy.get(".primary").click();

    cy.get(".go318386747").should("exist");
  });
});
