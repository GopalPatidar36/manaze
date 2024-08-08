import { LOGIN, GET_CURRENT_USER, GET_ALL_TICKET, GET_TICKET } from "./query";
Cypress.Commands.add("publicAPI", (query, variables = {}) => {
  cy.request({
    method: "POST",
    url: "http://localhost:6036/public", // Replace with your GraphQL endpoint
    body: {
      query,
      variables,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
});

Cypress.Commands.add("privateAPI", (query, variables = {}) => {
  const token = Cypress.env("authToken");
  cy.request({
    method: "POST",
    url: "http://localhost:6036/api", // Replace with your GraphQL endpoint
    body: {
      query,
      variables,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use the stored token
    },
  });
});

describe("Template Spec", () => {
  it("check user credential", () => {
    cy.publicAPI(LOGIN, { userEmail: "ramp@gmail.com", password: "12345" }).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env("authToken", response.body.data.login.token); // Store token in Cypress environment
      expect(response.body.data.login.user).to.include({
        uid: "236139b2-e7a5-49b8-9a56-f1b71cb12653",
      });
    });
  });
  it("get user data", () => {
    cy.privateAPI(GET_CURRENT_USER).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.data.me).to.not.have.property("password");
      expect(response.body.data.me).to.have.property("firstName");
      expect(response.body.data.me).to.have.property("lastName");
      expect(response.body.data.me).to.have.property("fullName");
      expect(response.body.data.me).to.have.property("userEmail");
      //   expect(response.body.data.me).to.include({
      //     firstName: "ram JI",
      //     userEmail: "ramp@gmail.com",
      //   });
    });
  });
  it("get data && and check limit", () => {
    cy.privateAPI(GET_ALL_TICKET).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.ticketList).to.have.property("count");
      expect(response.body.data.ticketList.rows.length).to.be.at.most(response.body.data.ticketList.count);
      expect(response.body.data.ticketList.rows.length).to.be.at.most(15);
    });
  });

  it("get data with LOW Status", () => {
    cy.privateAPI(GET_ALL_TICKET, { status: "LOW" }).then((response) => {
      const data = response.body.data.ticketList.rows;
      expect(response.status).to.eq(200);
      expect(response.body.data.ticketList).to.have.property("count");
      expect(data.length).to.be.at.most(response.body.data.ticketList.count);
      expect(data.length).to.be.at.most(15);
      for (let item of data) {
        expect(item.status).to.eq("LOW");
      }
    });
  });

  it("check single ticket property", () => {
    cy.privateAPI(GET_TICKET, { id: 65 }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.ticketByID).to.have.property("id");
      expect(response.body.data.ticketByID).to.have.property("title");
      expect(response.body.data.ticketByID).to.have.property("status");
      expect(response.body.data.ticketByID).to.have.property("priority");
    });
  });
  it("Get it by non existing id", () => {
    cy.privateAPI(GET_TICKET, { id: 65123 }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.ticketByID).to.eq(null);
    });
  });
});
