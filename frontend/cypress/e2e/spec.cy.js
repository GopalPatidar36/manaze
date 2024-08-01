describe("template spec", () => {
  beforeEach(() => {
    // Replace with the actual URL of your application
    cy.visit("http://localhost:3000/login");
  });

  it("should display error messages for invalid login credentials", () => {
    // Enter fake email
    cy.get('input[type="email"]').type("ramp@gmail.com");

    // Enter fake password
    cy.get('input[type="password"]').type("12345");

    // Click on login button
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    // cy.get('button[type="submit"]').click();
    // Wait for redirection to complete
    cy.url().should("not.include", "/login");

    // Ensure the navigation link is visible
    cy.get(".navlink").should("be.visible");
    cy.wait(500);

    // Click on the Issue link
    cy.get(".navlink").contains("Backlog").click();

    cy.url().should("include", "/backlog"); // Adjust based on the URL for the Issue page
    cy.wait(3000);
    cy.get(".DataTable").find("tr").eq(2).click();

    cy.wait(1500);

    cy.get(".dropDown").trigger("onmouseover");

    cy.get(".logoutButton").click({ force: true });
  });
});
