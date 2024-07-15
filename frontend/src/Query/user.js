import { gql } from "@apollo/client";

const CORE_FIELDS = gql`
  fragment CoreFields on userFields {
    uid
    firstName
    lastName
    role
    createdAt
    updatedAt
    userEmail
  }
`;

const TicketList = gql`
  ${CORE_FIELDS}
  fragment userList on UserSearchResult {
    count
    rows {
      ...CoreFields
    }
  }
`;

export const GET_CURRENT_USER = gql`
  ${CORE_FIELDS}
  query Me {
    me {
      ...CoreFields
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($uid: String!, $firstName: String, $lastName: String) {
    updateUser(uid: $uid, firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;
