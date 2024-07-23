import { screen, waitFor, within } from "@testing-library/react";
import Backlog from "../components/tickets/Backlog";
import { render } from "../testUtils";

import { GET_ALL_TICKET } from "../Query/index";

const mocks = [
  {
    request: {
      query: GET_ALL_TICKET,
      variables: { offset: 0 },
    },
    result: {
      data: {
        ticketList: {
          __typename: "TicketList",
          count: 5,
          rows: [
            {
              __typename: "Ticket",
              id: 1,
              title: "create a ticket update  -61",
              description:
                "the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   ",
              priority: "LOW",
              status: "OPEN",
              updatedAt: "1721052035000",
              createdAt: "1718715380000",
            },
            {
              __typename: "Ticket",
              id: 2,
              title:
                "ticket-702 testing is able to create a second number ticket  testing is able to create a second number ticket  testing is able to create a second number ticket testing is able to create a second number ticket  testing is able to create a second number ticket ",
              description: "testing is replace to create a second number ticket ",
              priority: "LOW",
              status: "INPROGRESS",
              updatedAt: "1721110760000",
              createdAt: "1718716225000",
            },
            {
              __typename: "Ticket",
              id: 5,
              title: "ticket-5-update",
              description: "1ticket-5-updated",
              priority: "LOW",
              status: "OPEN",
              updatedAt: "1721040503000",
              createdAt: "1718716294000",
            },
            {
              __typename: "Ticket",
              id: 16,
              title: "ticket-20012",
              description: "ticket-20  update discription ",
              priority: "LOW",
              status: "OPEN",
              updatedAt: "1721049603000",
              createdAt: "1718716667000",
            },
            {
              __typename: "Ticket",
              id: 17,
              title: "addTicket-17-12",
              description: "addTicket-17",
              priority: "LOW",
              status: "INPROGRESS",
              updatedAt: "1721052088000",
              createdAt: "1718716708000",
            },
          ],
        },
      },
    },
  },
];

describe("Testing with Backlog data", () => {
  let components;
  beforeEach(async () => {
    components = render(<Backlog />, { apolloMocks: mocks });
  });
  test("Check backlog text", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Backlog Issue/)).toBeInTheDocument();
    });
  });

  test("Check Create text", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Create Issue/)).toBeInTheDocument();
    });
  });
  test("Check ticket discription text", async () => {
    await waitFor(() => {
      const elements = screen.getAllByText(/addTicket-17/);
      expect(elements[0]).toBeInTheDocument();
    });
  });
  it("should match dom snapshot:-Backlog", () => {
    expect(components.asFragment()).toMatchSnapshot();
  });
});
