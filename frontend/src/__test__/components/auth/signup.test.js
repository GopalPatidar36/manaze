import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { render } from "../../../testUtils";
import Signup from "../../../components/auth/Signup";
import { CREATE_USER } from "../../../Query/index";

const login = {
  request: {
    query: CREATE_USER,
    variables: { userEmail: "ramp@gmail.com", firstName: "ram", lastName: "patidar", password: "12345" },
  },
  result: { data: { updateUser: { id: 123 } } },
};
const mocks = [login];
describe("Signup page testing", () => {
  let userSetting;
  beforeEach(async () => {
    userSetting = render(<Signup />, { apolloMocks: mocks });
  });

  test("displays personal information header", async () => {
    await waitFor(() => {
      const elements = screen.getAllByText(/Signup/);
      expect(elements[0]).toBeInTheDocument();
    });
  });

  test("enter email and password", async () => {
    await waitFor(() => {
      const firstName = screen.getByPlaceholderText("Enter your first name here");
      fireEvent.change(firstName, { target: { value: "ram" } });

      const lastName = screen.getByPlaceholderText("Enter your last name here");
      fireEvent.change(lastName, { target: { value: "patidar" } });

      const email = screen.getByPlaceholderText("Enter your email here");
      fireEvent.change(email, { target: { value: "ramp@gmail.com" } });

      const password = screen.getByPlaceholderText("Enter your password here");
      fireEvent.change(password, { target: { value: "12345" } });

      const confirm = screen.getByPlaceholderText("Enter confirm password here");
      fireEvent.change(confirm, { target: { value: "123456" } });

      const button = screen.getByRole("button", { name: /Signup/i });
      fireEvent.click(button);
    });

    await waitFor(() => {
      const errorMessage = screen.getAllByText("Password and Confirm Password do not match. Please try again");
      expect(errorMessage[0]).toBeInTheDocument();

      const confirm = screen.getByPlaceholderText("Enter confirm password here");
      fireEvent.change(confirm, { target: { value: "12345" } });
    });

    await waitFor(() => {
      const errorMessage = screen.queryByText("Password and Confirm Password do not match. Please try again");
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it("should match dom Login", () => {
    expect(userSetting.asFragment()).toMatchSnapshot();
  });
});
