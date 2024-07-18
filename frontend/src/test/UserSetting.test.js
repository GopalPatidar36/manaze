// src/App.test.js
// import axios from "../plugin/axios";
import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../testUtils";
import UserSetting from "../components/user/UserSetting";
import { GET_CURRENT_USER, UPDATE_USER } from "../Query/index";

jest.mock("../plugin/axios");

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
  // {
  //   request: {
  //     query: UPDATE_USER,
  //   },
  //   result: {
  //     data: {
  //       updateUser: {
  //         id: 11,
  //       },
  //     },
  //   },
  // },
];

const errorMocks = [
  {
    request: {
      query: GET_CURRENT_USER,
    },
    error: new Error("Network Error"),
  },
];

// const data = { data: "12345" };
// axios.get.mockResolvedValue({ data });
describe("fetches and displays data", () => {
  beforeEach(async () => {
    render(<UserSetting />, { apolloMocks: mocks });
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
});

// test("Update and Fetch data", async () => {
//   render(<UserSetting />, { apolloMocks: mocks });

//   await waitFor(() => {
//     expect(screen.getByText(/Personal Information/)).toBeInTheDocument();
//   });

//   await waitFor(() => {
//     expect(screen.getByText(/ram/)).toBeInTheDocument();
//     expect(screen.getByText(/ramp@gmail.com/)).toBeInTheDocument();
//   });
// });

// test("handles error", async () => {
//   axios.get.mockRejectedValue(new Error("Network Error"));

//   render(<App />);

//   expect(screen.getByText("Loading...")).toBeInTheDocument();

//   await waitFor(() => expect(screen.getByText("Error fetching data")).toBeInTheDocument());
// });
