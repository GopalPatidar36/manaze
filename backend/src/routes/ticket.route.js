const router = require("express").Router();
const config = require("config");
const createError = require("http-errors");
const { Ticket } = config.db.models;
const { filterModelData } = require("../utils/routeUtil");

async function getCurrent(req, res, next) {
  const _Ticket = await Ticket.findAndCountAll({
    include: [
      {
        association: "userTickets",
        required: true,
        where: { assignee: req.session.uid },
      },
    ],
  });
  if (!_Ticket) return next(createError(404));
  res.json(_Ticket);
}

async function get(req, res, next) {
  try {
    const { limit = 15, offset = 0 } = req.query;
    const _Ticket = await Ticket.findAndCountAll({
      include: [{ association: "userTickets" }],
      offset: Number(offset),
      limit: Number(limit),
    });
    if (!_Ticket) return next(createError(404));

    res.json(_Ticket);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const _Ticket = await Ticket.findOne({
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

async function create(req, res, next) {
  try {
    const _Ticket = await Ticket.create({
      ...req.body,
      createdBy: req.session.uid,
    });
    res.status(201).json({ id: _Ticket.id });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const _Ticket = await Ticket.findByPk(req.params.id);
    if (!_Ticket) {
      return next(createError(404));
    }
    const { $and: values } = filterModelData({ model: Ticket, data: req.body });
    for (const entry of values) {
      for (const [k, v] of Object.entries(entry)) {
        _Ticket[k] = v;
      }
    }
    await _Ticket.save({ userId: req.session.userId });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function deleteById(req, res, next) {
  try {
    await Ticket.destroy({ where: { id: req.params.id } });
    res.send(204);
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
