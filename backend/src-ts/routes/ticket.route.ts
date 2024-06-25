import { Router, Request, Response, NextFunction } from "express";
import config from "config";
import createError from "http-errors";
import { filterModelData, getOrderData } from "../utils/routeUtil";
import { alertMessage } from "../utils/alertMessage";
const { ticketCreated, ticketDeleted, ticketUpdated } = alertMessage;
const { Tickets } = config.db.models;
const router = Router();

interface DataObject {
  [key: string]: string;
}

async function getCurrent(req: Request, res: Response, next: NextFunction) {
  const _Ticket = await Tickets.findAndCountAll({
    include: [
      {
        association: "userTickets",
        required: true,
        where: { assignee: req.session.uid },
      },
    ],
    where: filterModelData({ model: Tickets, data: <DataObject>req.query }),
    // order: getOrderData({ model: Tickets, data: <DataObject>req.query }),
  });
  if (!_Ticket) return next(createError(404));
  res.json(_Ticket);
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit = 15, offset = 0 } = req.query;
    const _Ticket = await Tickets.findAndCountAll({
      include: [{ association: "userTickets" }],
      offset: Number(offset),
      limit: Number(limit),
      where: filterModelData({ model: Tickets, data: <DataObject>req.query }),
      // order: getOrderData({ model: Tickets, data: <DataObject>req.query }),
    });
    if (!_Ticket) return next(createError(404));

    res.json(_Ticket);
  } catch (err) {
    next(err);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _Ticket = await Tickets.findOne({
      include: [
        {
          association: "ticketIdUsers",
        },
      ],
      where: { id: req.params.id },
    });
    if (!_Ticket) {
      return next(createError(404));
    }
    res.json(_Ticket);
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const _Ticket: any = await Tickets.create({
      ...req.body,
      createdBy: req.session.uid,
    });
    res.status(201).json({ id: _Ticket.id, alertMessage: ticketCreated });
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const _Ticket = await Tickets.findByPk(req.params.id);
    if (!_Ticket) {
      return next(createError(404));
    }
    const { $and: values } = filterModelData({ model: Tickets, data: <DataObject>req.body });
    for (const entry of values) {
      for (const [k, v] of Object.entries(entry)) {
        (_Ticket as any)[k] = v;
      }
    }
    await _Ticket.save();
    res.status(201).json({ alertMessage: ticketUpdated });
  } catch (err) {
    next(err);
  }
}

async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    await Tickets.destroy({ where: { id: req.params.id }, individualHooks: true });
    res.status(204).json({ alertMessage: ticketDeleted });
  } catch (err) {
    next(err);
  }
}

router.get("/search", get);
router.get("/me", getCurrent);
router.get("/:id", getById);
router.put("/", create);
router.post("/:id", update);
router.delete("/:id", deleteById);

module.exports = router;
