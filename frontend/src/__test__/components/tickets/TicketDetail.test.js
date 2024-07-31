import { screen, waitFor, fireEvent } from "@testing-library/react";
import TicketDetail from "../../../components/tickets/TicketDetail";
import { render } from "../../../testUtils";
import { useParams } from "react-router-dom";

import { createTicket, getAllTicket, getCurrentUSERTicket, getTicket } from "../dummyData";

const mocks = [getTicket, createTicket, getAllTicket, getCurrentUSERTicket];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Ticket details Modal", () => {
  const closeModal = jest.fn(); // Mock the closeModal function
  let components;
  beforeEach(async () => {
    useParams.mockReturnValue({ id: "12" });
    components = render(<TicketDetail closeModal={closeModal} id="12" />, { apolloMocks: mocks });
  });

  test("Check Modal Heading", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Ticket details/)).toBeInTheDocument();
    });
  });

  test("Check ticket desc", async () => {
    await waitFor(() => {
      expect(screen.getByText(/dummpy title for test/)).toBeInTheDocument();
      expect(screen.getByText(/dummpy description for test/)).toBeInTheDocument();
    });
    await waitFor(() => {
      const priority = screen.getAllByRole("combobox", { id: "priority" });
      expect(priority[0].value).toBe("LOW");
    });

    await waitFor(() => {
      const status = screen.getAllByRole("combobox", { id: "status" });
      expect(status[1].value).toBe("OPEN");
    });
  });

  test("Update Ticket", async () => {
    // Use await with waitFor to handle async operations
    await waitFor(() => {
      const title = screen.getByText("dummpy title for test");
      expect(title).toBeInTheDocument();
      fireEvent.change(title, { target: { value: "update title for test" } });
    });
    expect(screen.getByText(/Save/)).toBeInTheDocument();
  });
});
