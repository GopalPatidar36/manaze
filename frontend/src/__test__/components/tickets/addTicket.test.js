import { screen, waitFor, fireEvent } from "@testing-library/react";
import AddTicket from "../../../components/tickets/addTicket";
import { render } from "../../../testUtils";
import { createTicket, updateTicket, getAllTicket, getCurrentUSERTicket, getUpdatedTicket, getTicket } from "../dummyData";

const mocks = [getTicket, createTicket, getAllTicket, getCurrentUSERTicket];
const updateMocks = [getTicket, getAllTicket, getCurrentUSERTicket, getUpdatedTicket, updateTicket];

describe("Test Add Ticket Modal", () => {
  let headerData;
  const closeModal = () => {};
  beforeEach(async () => {
    headerData = render(<AddTicket closeModal={closeModal} />, { apolloMocks: mocks });
  });

  test("Check Modal Description", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Log new ticket/)).toBeInTheDocument();
    });
  });

  test("Create Ticket", async () => {
    await waitFor(() => {
      const title = screen.getByPlaceholderText("Enter title");
      fireEvent.change(title, { target: { value: "dummpy title for test" } });
      expect(title.value).toBe("dummpy title for test");

      const desc = screen.getByPlaceholderText("Enter description");
      fireEvent.change(desc, { target: { value: "dummpy description for test" } });

      const priority = screen.getAllByRole("combobox", { id: "priority" });
      fireEvent.change(priority[0], { target: { value: "LOW" } });

      const status = screen.getAllByRole("combobox", { id: "status" });
      fireEvent.change(status[1], { target: { value: "INPROGRESS" } });

      const button = screen.getByRole("button", { name: /Create/i });
      fireEvent.click(button);
    });
  });

  //   test("Check Ticket Description", async () => {
  // await waitFor(() => {
  //   expect(screen.getByText(/Description/)).toBeInTheDocument();
  //   expect(screen.getByText(/dummpy Discription for test/)).toBeInTheDocument();

  //   //   const button = screen.getByRole("button", { name: /Create/i });
  //   fireEvent.click(button);
  // });
  //   });
});

describe("Test Update Ticket Modal", () => {
  let components;
  const closeModal = jest.fn(); // Mock the closeModal function

  beforeEach(() => {
    components = render(<AddTicket ticketId="12" closeModal={closeModal} />, { apolloMocks: updateMocks });
  });

  test("Update Ticket", async () => {
    // Use await with waitFor to handle async operations
    await waitFor(() => {
      const title = screen.getByPlaceholderText("Enter title");
      expect(title).toBeInTheDocument();
      expect(title.value).toBe("dummpy title for test");
    });

    const title = screen.getByPlaceholderText("Enter title");
    fireEvent.change(title, { target: { value: "update title for test" } });
    expect(title.value).toBe("update title for test");

    await waitFor(() => {
      const desc = screen.getByPlaceholderText("Enter description");
      expect(desc).toBeInTheDocument();
      expect(desc.value).toBe("dummpy description for test");
    });

    const desc = screen.getByPlaceholderText("Enter description");
    fireEvent.change(desc, { target: { value: "update description for test" } });
    expect(desc.value).toBe("update description for test");

    const priority = screen.getAllByRole("combobox", { id: "priority" });
    fireEvent.change(priority[0], { target: { value: "HIGH" } });
    expect(priority[0].value).toBe("HIGH");

    const status = screen.getAllByRole("combobox", { id: "status" });
    fireEvent.change(status[1], { target: { value: "CLOSED" } });
    expect(status[1].value).toBe("CLOSED");

    const button = screen.getByRole("button", { name: "Update" });
    fireEvent.click(button);

    // Optionally, add assertions to verify that the closeModal function was called
    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
    });
  });
});