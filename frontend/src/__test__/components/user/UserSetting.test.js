// src/App.test.js
// import axios from "../plugin/axios";
import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../testUtils";
import UserSetting from "../../../components/user/UserSetting";
import { GET_CURRENT_USER, UPDATE_USER } from "../../../Query/index";

// jest.mock("../plugin/axios");

const GetCurrentUserMock = {
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
};
const updateUserMock = {
  request: {
    query: UPDATE_USER,
    variables: { uid: "236139b2-e7a5-49b8-9a56-f1b71cb12653", firstName: "Gopal", lastName: "Patidar" },
  },
  result: {
    data: {
      updateUser: {
        __typename: "userFields",
        id: 11,
      },
    },
  },
};
const mocks = [GetCurrentUserMock, updateUserMock, GetCurrentUserMock];

// axios.get.mockResolvedValue({ data });
describe("fetches and displays data", () => {
  let userSetting;
  beforeEach(async () => {
    userSetting = render(<UserSetting />, { apolloMocks: mocks });
  });

  test("displays personal information header", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Personal Information/)).toBeInTheDocument();
    });
  });

  test("displays initial user data", async () => {
    await waitFor(() => {
      expect(screen.getByText("ram")).toBeInTheDocument();
      expect(screen.getByText("ramp@gmail.com")).toBeInTheDocument();
    });
  });

  test("updates and displays new user data", async () => {
    await waitFor(() => {
      expect(screen.getByText("ram")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => {
      fireEvent.change(screen.getByDisplayValue("ram"), { target: { value: "Gopal" } });
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Gopal")).toBeInTheDocument();
    });
  });

  it("should match dom snapshot", () => {
    expect(userSetting.asFragment()).toMatchSnapshot();
  });
});
