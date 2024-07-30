// src/App.test.js
// import axios from "../plugin/axios";
import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../testUtils";
import UserSetting from "../../../components/user/UserSetting";
import { getCurrentUSER, updateUser } from "../dummyData";

const mocks = [getCurrentUSER, updateUser, getCurrentUSER];

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
