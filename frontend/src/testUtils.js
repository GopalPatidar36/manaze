// src/testUtils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import store from "./store";

function render(ui, { preloadedState, apolloMocks, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MockedProvider mocks={apolloMocks} addTypename={false}>
          {children}
        </MockedProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
