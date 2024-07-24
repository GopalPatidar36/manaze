import { screen, waitFor, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";
import { GET_CURRENT_USER } from "../../Query/index";
import { render } from "../../testUtils";

const mocks = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    result: {
      data: {
        me: {
          __typename: "userFields",
          id: 11,
          uid: "236139b2-e7a5-49b8-9a56-f1b71cb12653",
          userEmail: "ramp@gmail.com",
          firstName: "ram",
          lastName: "Patidar",
          role: "member",
          createdAt: "2024-07-20T12:00:00Z",
          updatedAt: "2024-07-20T12:30:00Z",
        },
      },
    },
  },
];

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
