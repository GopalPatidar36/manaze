import { gql } from "@apollo/client";

const CORE_FIELDS = gql`
  fragment CoreFields on Ticket {
    id
    title
    description
    priority
    status
  }
`;

const TicketList = gql`
  ${CORE_FIELDS}
  fragment ticketList on TicketList {
    count
    rows {
      ...CoreFields
    }
  }
`;

export const GET_CURRENT_USER_TICKET = gql`
  ${TicketList}
  query CurrentUserTicket($title: String, $description: String, $priority: String, $status: String, $limit: Int, $offset: Int, $order: String) {
    currentUserTicket(title: $title, description: $description, priority: $priority, status: $status, limit: $limit, offset: $offset, order: $order) {
      ...ticketList
    }
  }
`;

export const GET_ALL_TICKET = gql`
  query TicketList($title: String, $description: String, $priority: String, $status: String, $limit: Int, $offset: Int, $order: String) {
    ticketList(title: $title, description: $description, priority: $priority, status: $status, limit: $limit, offset: $offset, order: $order) {
      ...ticketList
    }
  }
  ${TicketList}
`;

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($id: Int!, $title: String, $description: String, $priority: String, $status: String) {
    updateTicket(id: $id, title: $title, description: $description, priority: $priority, status: $status) {
      id
    }
  }
`;
