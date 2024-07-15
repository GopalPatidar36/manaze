import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toatMessage } from "./components/ToastifyAlert";
import "./CSS/index";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { logout } from "./redux/slices/authSlice";

const publicLink = new HttpLink({ uri: "http://localhost:6036/public" });
const privateLink = new HttpLink({ uri: "http://localhost:6036/api" });

// Middleware to add headers for private requests
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

// Create a split link to direct requests to the appropriate endpoint
const apolloLink = ApolloLink.split(
  (operation) => operation.getContext().public, // Use context to determine if request is public
  publicLink,
  concat(authMiddleware, privateLink)
);
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  const error = {};
  graphQLErrors &&
    graphQLErrors.forEach((item) => {
      error.message = error.message || item.message;
      error.statusCode = error.statusCode || item.statusCode;
    });
  if (networkError) {
    if (networkError.statusCode === 401) {
      error.statusCode = networkError.statusCode;
      error.message = "UnauthorizedError";
    }
  }
  toatMessage(error.message, "error");
  if (Number(error.statusCode) === 401) {
    store.dispatch(logout());
  }
});
const client = new ApolloClient({
  link: errorLink.concat(apolloLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
