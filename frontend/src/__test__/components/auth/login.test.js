// src/App.test.js
// import axios from "../plugin/axios";
import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { render } from "../../../testUtils";
import Login from "../../../components/auth/Login";
import { LOGIN } from "../../../Query/index";

// jest.mock("../plugin/axios");

const login = {
  request: {
    query: LOGIN,
    variables: { userEmail: "ramp@gmail.com", password: "12345" },
  },
  result: {
    data: {
      login: {
        token: "xyuisgadag",
        user: {
          uid: "236139b2-e7a5-49b8-9a56-f1b71cb12653",
          userEmail: "ramp@gmail.com",
          firstName: "ram",
          lastName: "Patidar",
          password: "12345",
        },
      },
    },
  },
};
const mocks = [login];

// axios.get.mockResolvedValue({ data });
describe("fetches and displays data", () => {
  let userSetting;
  beforeEach(async () => {
    userSetting = render(<Login />, { apolloMocks: mocks });
  });

  test("displays personal information header", async () => {
    await waitFor(() => {
      const elements = screen.getAllByText(/Login/);
      expect(elements[0]).toBeInTheDocument();
    });
  });

  test("enter email and password", async () => {
    // const handleSubmit = jest.fn((e) => {
    //   e.preventDefault(); // Prevent actual form submission
    // });
    await waitFor(() => {
      const email = screen.getByPlaceholderText("Enter your email here");
      //   const button = screen.getByRole("button", { name: /submit/i });
      fireEvent.change(email, { target: { value: "ramp@gmail.com" } });

      const password = screen.getByPlaceholderText("Enter your password here");
      //   const button = screen.getByRole("button", { name: /submit/i });
      fireEvent.change(password, { target: { value: "12345" } });

      const button = screen.getByRole("button", { name: /Login/i });
      fireEvent.click(button);

      // Assert that handleSubmit was called once
      // expect(handleSubmit).toHaveBeenCalledTimes(2);
    });
  });

  it("should match dom Login", () => {
    expect(userSetting.asFragment()).toMatchSnapshot();
  });
});
