import { screen, waitFor, fireEvent } from "@testing-library/react";
import DeleteTicket from "../../../components/tickets/Delete";
import { render } from "../../../testUtils";
import { getTicket, deleteTicket, getAllTicket, getCurrentUSERTicket } from "../dummyData";

const mocks = [getTicket, deleteTicket, getAllTicket, getCurrentUSERTicket];

describe("Test Ticket Delete Modal", () => {
  let headerData;
  const closeModal = () => {};
  beforeEach(async () => {
    headerData = render(<DeleteTicket ticketId="12" closeModal={closeModal} />, { apolloMocks: mocks });
  });

  test("Check Modal Description", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Are you sure you want to delete this ticket?/)).toBeInTheDocument();
    });
  });

  test("Check Ticket Title", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Title/)).toBeInTheDocument();
      expect(screen.getByText(/dummpy title for test/)).toBeInTheDocument();
    });
  });

  test("Check Ticket Description", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Description/)).toBeInTheDocument();
      expect(screen.getByText(/dummpy description for test/)).toBeInTheDocument();

      const button = screen.getByRole("button", { name: /Delete/i });
      fireEvent.click(button);
    });
  });
});
