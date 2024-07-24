import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($userEmail: String!, $password: String!) {
    login(userEmail: $userEmail, password: $password) {
      token
      user {
        uid
        userEmail
        password
        firstName
        lastName
      }
    }
  }
`;
