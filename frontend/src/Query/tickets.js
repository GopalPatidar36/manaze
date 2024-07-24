import { gql } from "@apollo/client";

const CORE_FIELDS = gql`
  fragment CoreFields on Ticket {
    id
    title
    description
    priority
    status
    createdAt
    updatedAt
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

export const CREATE_TICKET = gql`
  mutation CreateTicket($title: String, $description: String, $priority: String, $status: String) {
    createTicket(title: $title, description: $description, priority: $priority, status: $status) {
      id
    }
  }
`;

export const GET_TICKET = gql`
  ${CORE_FIELDS}
  query TicketByID($id: Int!) {
    ticketByID(id: $id) {
      ...CoreFields
      ticketUsersDetails {
        uid
        firstName
        lastName
        fullName
      }
    }
  }
`;

export const DELETE_TICKET = gql`
 mutation DeleteTicket($id: Int!) {
    deleteTicket(id: $id) {
      id
    }
  }
`;