export const LOGIN = `
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

export const GET_CURRENT_USER = `
  query Me {
    me {
      uid
      firstName
      lastName
      fullName
      role
      createdAt
      updatedAt
      userEmail
    }
  }
`;
