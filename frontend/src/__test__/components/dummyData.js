import {
  GET_ALL_TICKET,
  GET_CURRENT_USER,
  GET_TICKET,
  GET_CURRENT_USER_TICKET,
  DELETE_TICKET,
  UPDATE_USER,
  CREATE_TICKET,
  UPDATE_TICKET,
} from "../../Query/index";

export const getCurrentUSER = {
  request: { query: GET_CURRENT_USER },
  result: {
    data: {
      me: {
        __typename: "userFields",
        id: 11,
        uid: "236139b2-e7a5-49b8-9a56-f1b71cb12653",
        userEmail: "ramp@gmail.com",
        firstName: "ram",
        lastName: "Patidar",
        fullName: "ram Patidar",
        role: "member",
        createdAt: "2024-07-20T12:00:00Z",
        updatedAt: "2024-07-20T12:30:00Z",
      },
    },
  },
};

export const updateUser = {
  request: {
    query: UPDATE_USER,
    variables: { uid: "236139b2-e7a5-49b8-9a56-f1b71cb12653", firstName: "Gopal", lastName: "Patidar" },
  },
  result: {
    data: {
      updateUser: {
        __typename: "userFields",
        id: 11,
      },
    },
  },
};

export const createTicket = {
  request: {
    query: CREATE_TICKET,
    variables: {
      title: "dummpy title for test",
      description: "dummpy description for test",
      priority: "LOW",
      status: "INPROGRESS",
    },
  },
  result: { data: { createTicket: { id: 12 } } },
};

export const updateTicket = {
  request: {
    query: UPDATE_TICKET,
    variables: {
      id: 12,
      title: "update title for test",
      description: "update description for test",
      priority: "HIGH",
      status: "CLOSED",
    },
  },
  result: { data: { updateTicket: { id: 12 } } },
};

export const getUpdatedTicket = {
  request: {
    query: GET_TICKET,
    variables: { id: 12 },
  },
  result: {
    data: {
      ticketByID: {
        __typename: "Ticket",
        id: 12,
        title: "update title for test",
        description: "update description for test",
        priority: "HIGH",
        status: "CLOSED",
        createdAt: "234",
        updatedAt: "234",
        ticketUsersDetails: [
          {
            uid: "qalk-12321-w2dn",
            firstName: "gopal",
            lastName: "patidar",
            fullName: "gopal patidar",
          },
        ],
      },
    },
  },
};

export const getTicket = {
  request: {
    query: GET_TICKET,
    variables: { id: 12 },
  },
  result: {
    data: {
      ticketByID: {
        __typename: "Ticket",
        id: 12,
        title: "dummpy title for test",
        description: "dummpy description for test",
        priority: "LOW",
        status: "OPEN",
        createdAt: "234",
        updatedAt: "234",
        ticketUsersDetails: [
          {
            uid: "qalk-12321-w2dn",
            firstName: "gopal",
            lastName: "patidar",
            fullName: "gopal patidar",
          },
        ],
      },
    },
  },
};

export const deleteTicket = {
  request: {
    query: DELETE_TICKET,
    variables: { id: 12 },
  },
  result: { data: { deleteTicket: { id: 12 } } },
};

export const getAllTicket = {
  request: {
    query: GET_ALL_TICKET,
    variables: { offset: 0 },
  },
  result: {
    data: {
      ticketList: {
        __typename: "TicketList",
        count: 5,
        rows: [
          {
            __typename: "Ticket",
            id: 1,
            title: "create a ticket update  -61",
            description:
              "the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   ",
            priority: "LOW",
            status: "OPEN",
            updatedAt: "1721052035000",
            createdAt: "1718715380000",
          },
          {
            __typename: "Ticket",
            id: 2,
            title:
              "ticket-702 testing is able to create a second number ticket  testing is able to create a second number ticket  testing is able to create a second number ticket testing is able to create a second number ticket  testing is able to create a second number ticket ",
            description: "testing is replace to create a second number ticket ",
            priority: "LOW",
            status: "INPROGRESS",
            updatedAt: "1721110760000",
            createdAt: "1718716225000",
          },
          {
            __typename: "Ticket",
            id: 5,
            title: "ticket-5-update",
            description: "1ticket-5-updated",
            priority: "LOW",
            status: "OPEN",
            updatedAt: "1721040503000",
            createdAt: "1718716294000",
          },
          {
            __typename: "Ticket",
            id: 16,
            title: "ticket-20012",
            description: "ticket-20  update discription ",
            priority: "LOW",
            status: "OPEN",
            updatedAt: "1721049603000",
            createdAt: "1718716667000",
          },
          {
            __typename: "Ticket",
            id: 17,
            title: "addTicket-17-12",
            description: "addTicket-17",
            priority: "LOW",
            status: "INPROGRESS",
            updatedAt: "1721052088000",
            createdAt: "1718716708000",
          },
        ],
      },
    },
  },
};

export const getCurrentUSERTicket = {
  request: {
    query: GET_CURRENT_USER_TICKET,
    variables: { offset: 0 },
  },
  result: {
    data: {
      currentUserTicket: {
        __typename: "TicketList",
        count: 5,
        rows: [
          {
            __typename: "Ticket",
            id: 1,
            title: "create a ticket update  -61",
            description:
              "the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   the update is from the ticket details page   ",
            priority: "LOW",
            status: "OPEN",
            updatedAt: "1721052035000",
            createdAt: "1718715380000",
          },
          {
            __typename: "Ticket",
            id: 2,
            title:
              "ticket-702 testing is able to create a second number ticket  testing is able to create a second number ticket  testing is able to create a second number ticket testing is able to create a second number ticket  testing is able to create a second number ticket ",
            description: "testing is replace to create a second number ticket ",
            priority: "LOW",
            status: "INPROGRESS",
            updatedAt: "1721110760000",
            createdAt: "1718716225000",
          },
          {
            __typename: "Ticket",
            id: 5,
            title: "ticket-5-update",
            description: "1ticket-5-updated",
            priority: "LOW",
            status: "OPEN",
            updatedAt: "1721040503000",
            createdAt: "1718716294000",
          },
          {
            __typename: "Ticket",
            id: 16,
            title: "ticket-20012",
            description: "ticket-20  update discription ",
            priority: "LOW",
            status: "OPEN",
            updatedAt: "1721049603000",
            createdAt: "1718716667000",
          },
          {
            __typename: "Ticket",
            id: 17,
            title: "addTicket-17-12",
            description: "addTicket-17",
            priority: "LOW",
            status: "INPROGRESS",
            updatedAt: "1721052088000",
            createdAt: "1718716708000",
          },
        ],
      },
    },
  },
};
