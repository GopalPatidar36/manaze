import { screen, waitFor, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";
import { render } from "../../testUtils";
import { getCurrentUSER } from "./dummyData";
const mocks = [getCurrentUSER];

describe("Testing with header data", () => {
  let headerData;
  beforeEach(async () => {
    headerData = render(<Header />, { apolloMocks: mocks });
  });

  test("displays personal information header", async () => {
    await waitFor(() => {
      expect(screen.getByText(/RP/)).toBeInTheDocument();
    });
  });

  test("Check logout button", async () => {
    await waitFor(() => {
      expect(screen.getByText(/logout/)).toBeInTheDocument();
    });
  });

  test("Check Profile Settings", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Profile Settings/)).toBeInTheDocument();
    });
  });
  test("Check Profile Settings", async () => {
    fireEvent.click(screen.getByText("logout"));
  });

  it("should match dom snapshot", () => {
    expect(headerData.asFragment()).toMatchSnapshot();
  });
});
