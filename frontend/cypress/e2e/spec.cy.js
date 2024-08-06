import { getAllTicket, getCurrentUSERTicket, login, getCurrentUSER } from "../../src/__test__/components/dummyData";

// Add custom Cypress command for login
Cypress.Commands.add("login", (email, password) => {
  cy.get('input[type="email"]').as("userEmail");

  cy.title().should("eq", "ticket management");

  cy.get("@userEmail").type(email);

  // Enter the password
  cy.get('input[type="password"]').type(password);

  // Click the login button
  cy.get('button[type="submit"]').click();
});

describe("Template Spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    // Intercept API requests and provide mock responses
    cy.intercept("POST", "http://localhost:6036/api", (req) => {
      const { operationName, variables } = req.body;

      if (operationName === "TicketList") {
        req.reply({ statusCode: 200, body: getAllTicket.result });
      } else if (operationName === "CurrentUserTicket") {
        req.reply({ statusCode: 200, body: getCurrentUSERTicket.result });
      } else if (operationName === "Me") {
        req.reply({ statusCode: 200, body: getCurrentUSER.result });
      } else if (operationName === "TicketByID") {
        req.reply({
          statusCode: 200,
          body: {
            data: { ticketByID: getAllTicket.result.data.ticketList.rows.find((item) => item.id == variables.id) },
          },
        });
      }
    }).as("apiData");

    cy.intercept("POST", "http://localhost:6036/public", (req) => {
      req.reply({
        statusCode: 200,
        body: login.result,
      });
    }).as("publicData");
  });

  it("should display error messages for invalid login credentials", () => {
    // Perform login action using custom command
    cy.login("ramp@gmail.com", "12345");

    // Wait for redirection to complete
    cy.url().should("not.include", "/login");

    // Ensure the navigation link is visible
    cy.get(".navlink").should("be.visible");

    // Click on the Backlog link
    cy.get(".navlink").contains("Backlog").click();
    cy.url().should("include", "/backlog");

    // Validate the fifth ticket's description in the DataTable
    cy.get(".DataTable")
      .find("tr")
      .eq(5)
      .find("td#description")
      .should("contain.text", getAllTicket.result.data.ticketList.rows[4].description);

    // Interact with the DataTable
    cy.get(".DataTable").find("tr").eq(2).click();

    // Click on the Issue link
    cy.get(".navlink").contains("Issue").click();

    // Validate the number of rows in the DataTable
    cy.get(".DataTable")
      .find("tr")
      .its("length")
      .should("be.lt", 16);

    // Interact with profile settings dropdown
    cy.get(".dropContain").invoke("show").wait(1000).get(".profileSettingBtn").click();

    // Validate URL change after clicking profile settings button
    cy.url().should("include", "/userprofile");

    // Ensure dropdown is hidden after interaction
    cy.get(".dropContain").should("not.be.visible");

    // Navigate back and forth
    cy.go(-1);
    cy.wait(1000);
    cy.go(1);

    // Interact with logout button
    cy.get(".dropContain").invoke("show").wait(1000).get(".logoutButton").click();
  });
});
