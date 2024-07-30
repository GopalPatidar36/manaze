import { screen, waitFor, fireEvent } from "@testing-library/react";
import AddTicket from "../../../components/tickets/addTicket";
import { render } from "../../../testUtils";
import { createTicket, deleteTicket, getAllTicket, getCurrentUSERTicket } from "../dummyData";

const mocks = [createTicket, getAllTicket, getCurrentUSERTicket];

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

      // const priority = screen.findByText("priority");
      // const priority = screen.findByAltText('select');
      // const priority = screen.getByRole('combobox', { name: /priority/i });
      // fireEvent.change(priority, { target: { value: "LOW" } });
      // console.log("🚀 ~ awaitwaitFor ~ priority:", priority)
    //   expect(screen.getByRole("option", { name: "LOW" }).selected).toBe(true);

    //   const status = screen.getByTestId("status");
    //   console.log("🚀 ~ awaitwaitFor ~ status:", status);
    //   fireEvent.change(status, { target: { value: "OPEN" } });

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
