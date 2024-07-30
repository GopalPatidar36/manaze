import { screen, waitFor, fireEvent } from "@testing-library/react";
import CurrentUserTickets from "../../../components/tickets/CurrentUserTickets";
import { render } from "../../../testUtils";
import { getCurrentUSERTicket } from "../dummyData";

const mocks = [getCurrentUSERTicket];

describe("Test Current User Ticket", () => {
  let components;
  beforeEach(async () => {
    components = render(<CurrentUserTickets />, { apolloMocks: mocks });
  });

  test("Check current user ticket text", async () => {
    await waitFor(() => {
      expect(screen.getByText(/My Issue/)).toBeInTheDocument();
    });
  });

  test("Check Create text", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Create Issue/)).toBeInTheDocument();
    });
  });
  test("Check ticket discription text", async () => {
    await waitFor(() => {
      const elements = screen.getAllByText(/ticket-20012/);
      expect(elements[0]).toBeInTheDocument();
    });
  });

  it("should match dom snapshot:-Backlog", async () => {
    await waitFor(() => {
      expect(components.asFragment()).toMatchSnapshot();
    });
  });
});
