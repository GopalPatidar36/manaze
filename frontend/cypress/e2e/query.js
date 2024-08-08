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

export const GET_ALL_TICKET = `
  query TicketList($title: String, $description: String, $priority: String, $status: String, $limit: Int, $offset: Int, $order: String) {
    ticketList(title: $title, description: $description, priority: $priority, status: $status, limit: $limit, offset: $offset, order: $order) {
      count
      rows {
        id
        title
        description
        priority
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_TICKET = `
  query TicketByID($id: Int!) {
    ticketByID(id: $id) {
      id
      title
      description
      priority
      status
      createdAt
      updatedAt
      ticketUsersDetails {
        uid
        firstName
        lastName
        fullName
      }
    }
  }
`;
