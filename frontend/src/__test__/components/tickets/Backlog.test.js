import { screen, waitFor, act } from "@testing-library/react";
import Backlog from "../../../components/tickets/Backlog";
import { render } from "../../../testUtils";
import { getAllTicket } from "../dummyData";

const mocks = [getAllTicket];

describe("Testing with Backlog data", () => {
  let components;
  beforeEach(async () => {
    await act(async () => {
      components = render(<Backlog />, { apolloMocks: mocks });
    });
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
  it("should match dom snapshot:-Backlog", async () => {
    await waitFor(() => {
      expect(components.asFragment()).toMatchSnapshot();
    });
  });
});
