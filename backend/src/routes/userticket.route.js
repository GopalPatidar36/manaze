const router = require("express").Router();
const config = require("config");
const createError = require("http-errors");
const { UserTicket } = config.db.models;

async function create(req, res, next) {
  try {
    const userUuid = Array.isArray(req.body.uid) ? req.body.uid : [req.body.uid];
    const uerTicket = [];
    for (const user of userUuid) {
      uerTicket.push({
        assignee: user,
        createdBy: req.session.uid,
        ticketId: req.params.ticketId,
        deletedAt: null,
      });
    }
    await UserTicket.bulkCreate(uerTicket, {
      updateOnDuplicate: ["deletedAt"],
      createdBy: req.session.uid,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function deleteById(req, res, next) {
  try {
    await UserTicket.destroy({ where: { id: req.params.id } });
    res.send(204);
  } catch (err) {
    next(err);
  }
}

router.put("/:ticketId", create);
router.post("/:id", update);
router.delete("/:id", deleteById);

module.exports = router;
