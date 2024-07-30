import { gql } from "@apollo/client";

const CORE_FIELDS = gql`
  fragment initialUserFields on userFields {
    uid
    firstName
    lastName
    fullName
    role
    createdAt
    updatedAt
    userEmail
  }
`;

const UserList = gql`
  ${CORE_FIELDS}
  fragment userList on UserSearchResult {
    count
    rows {
      ...initialUserFields
    }
  }
`;

export const GET_CURRENT_USER = gql`
  ${CORE_FIELDS}
  query Me {
    me {
      ...initialUserFields
    }
  }
`;

export const SEARCH_USER = gql`
  ${CORE_FIELDS}
  query UserList($firstName: String, $lastName: String, $fullName: String, $userEmail: String) {
    userList(firstName: $firstName, lastName: $lastName, fullName: $fullName, userEmail: $userEmail) {
      count
      rows {
        ...initialUserFields
      }
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

export const CREATE_USER = gql`
  mutation UpdateUser($firstName: String, $lastName: String, $userEmail: String, $password: String) {
    updateUser(firstName: $firstName, lastName: $lastName, userEmain: $userEmail, password: $password) {
      id
    }
  }
`;
