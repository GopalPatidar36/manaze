import { screen, waitFor, fireEvent } from "@testing-library/react";
import TicketDetail from "../../../components/tickets/TicketDetail";
import { render } from "../../../testUtils";
import { useParams } from "react-router-dom";

import { createTicket, updateTicket, getAllTicket, getCurrentUSERTicket, getUpdatedTicket, getTicket } from "../dummyData";

const mocks = [getTicket, createTicket, getAllTicket, getCurrentUSERTicket];
const updateMocks = [getTicket, getAllTicket, getCurrentUSERTicket, getUpdatedTicket, updateTicket];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Ticket details Modal", () => {
  let headerData;
  const closeModal = () => {};
  beforeEach(async () => {
    useParams.mockReturnValue({ id: "12" });
    headerData = render(<TicketDetail closeModal={closeModal} id="12" />, { apolloMocks: mocks });
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
});

// const closeModal = jest.fn(); // Mock the closeModal function

// test("Update Ticket", async () => {
//   // Use await with waitFor to handle async operations
//   await waitFor(() => {
//     const title = screen.getByPlaceholderText("Enter title");
//     expect(title).toBeInTheDocument();
//     expect(title.value).toBe("dummpy title for test");
//   });

//   const title = screen.getByPlaceholderText("Enter title");
//   fireEvent.change(title, { target: { value: "update title for test" } });
//   expect(title.value).toBe("update title for test");

//   await waitFor(() => {
//     expect(closeModal).toHaveBeenCalled();
//   });
// });
