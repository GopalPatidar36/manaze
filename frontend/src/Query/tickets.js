import { gql } from "@apollo/client";

export const GET_CURRENT_USER_TICKET = gql`
  query CurrentUserTicket($title: String, $description: String, $priority: String, $status: String, $limit: Int, $offset: Int) {
    currentUserTicket(title: $title, description: $description, priority: $priority, status: $status, limit: $limit, offset: $offset) {
      count
      rows {
        id
        title
        description
        priority
        status
      }
    }
  }
`;

export const GET_ALL_TICKET = gql`
  query TicketList($title: String, $description: String, $priority: String, $status: String, $limit: Int, $offset: Int) {
    ticketList(title: $title, description: $description, priority: $priority, status: $status, limit: $limit, offset: $offset) {
      count
      rows {
        id
        title
        description
        priority
        status
      }
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($id: Int!, $title: String, $description: String, $priority: String, $status: String) {
    updateTicket(id: $id, title: $title, description: $description, priority: $priority, status: $status) {
      id
    }
  }
`;
