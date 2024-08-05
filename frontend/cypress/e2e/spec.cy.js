import { GET_ALL_TICKET } from "../../src/Query/index";
describe("template spec", () => {
  beforeEach(() => {
    // Replace with the actual URL of your application
    cy.visit("http://localhost:3000/login");
  });

  it("should display error messages for invalid login credentials", () => {
    // Enter fake email
    cy.get('input[type="email"]').as("userEmail");

    cy.title().should("eq", "ticket management");

    cy.get('input[type="email"]').type("ramp@gmail.com");

    // Enter fake password
    cy.get('input[type="password"]').type("12345");

    // Click on login button
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    // const abcd = cy.window().localStorage;
    // cy.log("abcd abcd ", abcd);

    cy.window().then((window) => {
      const token = window.localStorage.getItem("accessToken");
      cy.wrap(token).as("authToken");
      expect(token).to.exist;
    });

    cy.wait(1000);
    // const data = cy.request({
    //   method: 'POST',
    //   url: 'https://example.com/graphql',
    //   body: {
    //     query,
    //     variables,
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${cy.get("$authToken")}`
    //   })

    // cy.get("@authToken").then((token) => {
    //   cy.log("tokentokentoken-1", token);
    //   cy.request({
    //     method: "POST",
    //     url: "http://localhost:6036/api",
    //     body: {
    //       query: GET_ALL_TICKET,
    //       // variables,
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }).then((response) => {
    //     cy.log("responseresponse", response);
    //     expect(response.status).to.equal(200);
    //   });
    // });

    // cy.get('button[type="submit"]').click();
    // Wait for redirection to complete
    cy.url().should("not.include", "/login");

    // Ensure the navigation link is visible
    cy.get(".navlink").should("be.visible");
    cy.wait(500);

    // Click on the Issue link
    cy.get(".navlink").contains("Backlog").click();

    cy.url().should("include", "/backlog"); // Adjust based on the URL for the Issue page
    // cy.pageUp();
    cy.wait(2000);
    cy.get(".DataTable").find("tr").eq(2).click();

    cy.get(".navlink").contains("Issue").click();

    cy.get(".DataTable")
      .find("tr") // this yields us a jquery object
      .its("length") // calls 'length' property returning that value
      .should("be.lt", 16);

    cy.get(".dropContain").invoke("show").wait(1000).get(".profileSettingBtn").click();

    cy.url().should("include", "/userprofile"); // Adjust based on the URL for the Issue page
    cy.wait(1000);

    cy.get(".dropContain").find("button");

    cy.get(".dropContain").should("not.be.visible");

    cy.get(".dropContain").invoke("show").wait(1000).get(".logoutButton").click();
  });
});
