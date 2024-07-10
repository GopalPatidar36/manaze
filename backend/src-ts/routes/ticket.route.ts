import GraphQL, { GraphQLList, GraphQLString, GraphQLInt } from "graphql";
import config from "config";
import createError from "http-errors";
import { filterModelData, getOrderData } from "../utils/routeUtil";
import TicketsType from "../TypeDef/ticket";

import { alertMessage } from "../utils/alertMessage";
const { ticketCreated, ticketDeleted, ticketUpdated } = alertMessage;
const { Tickets } = config.db.models;

interface DataObject {
  [key: string]: string;
}

async function getCurrent(req: any) {
  const _Ticket = await Tickets.findAndCountAll({
    include: [
      {
        association: "userTickets",
        required: true,
        where: { assignee: req.session.uid },
      },
    ],
    where: filterModelData({ model: Tickets, data: <DataObject>req }),
    // order: getOrderData({ model: Tickets, data: <DataObject>req.query }),
  });
  if (!_Ticket) return createError(404);
  return _Ticket;
}

async function get(req: any) {
  try {
    const { limit = 15, offset = 0 } = req;
    const _Ticket = await Tickets.findAll({
      include: [{ association: "userTickets" }],
      offset: Number(offset),
      limit: Number(limit),
      where: filterModelData({ model: Tickets, data: <DataObject>req }),
      // order: getOrderData({ model: Tickets, data: <DataObject>req.query }),
    });
    if (!_Ticket) return createError(404);

    return _Ticket;
  } catch (err) {
    return err;
  }
}

async function getById(req: any) {
  try {
    const _Ticket = await Tickets.findAll({
      include: [
        {
          association: "ticketIdUsers",
        },
      ],
      where: { id: req.id },
    });
    if (!_Ticket) {
      return createError(404);
    }
    return _Ticket;
  } catch (err) {
    return err;
  }
}

async function create(req: any) {
  try {
    const _Ticket: any = await Tickets.create({
      ...req,
      // createdBy: req.session.uid,
    });
    return _Ticket;
  } catch (err) {
    return err;
  }
}

async function update(req: any) {
  try {
    const _Ticket = await Tickets.findByPk(req.id);
    if (!_Ticket) {
      return createError(404);
    }
    const { $and: values } = filterModelData({ model: Tickets, data: <DataObject>req });
    for (const entry of values) {
      for (const [k, v] of Object.entries(entry)) {
        (_Ticket as any)[k] = v;
      }
    }
    await _Ticket.save();
  } catch (err) {
    return err;
  }
}

async function deleteById(req: any) {
  try {
    await Tickets.destroy({ where: { id: req.id }, individualHooks: true });
  } catch (err) {
    return err;
  }
}

export const SEARCH = {
  type: new GraphQLList(TicketsType),
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  resolve(parent: any, req: any) {
    return get(req);
  },
};

export const FINDONE = {
  type: new GraphQLList(TicketsType),
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent: any, args: any) {
    return getById(args);
  },
};

export const CREATE = {
  type: TicketsType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return create(args);
  },
};

export const UPDATE = {
  type: TicketsType,
  args: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return update(args);
  },
};

export const DELETE = {
  type: TicketsType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent: any, args: any) {
    return deleteById(args);
  },
};

export default {
  QUERY: { ticketList: SEARCH, ticketByID: FINDONE },
  MUTATION: { createTicket: CREATE, updateTicket: UPDATE, deleteTicket: DELETE },
};
