import { Router, Request, Response, NextFunction } from "express";
import config from "config";
const { UserTicket } = config.db.models;
const router = Router();

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userUuid = Array.isArray(req.body.uid) ? req.body.uid : [req.body.uid];
    const uerTicket: any[] = [];
    for (const user of userUuid) {
      uerTicket.push({
        assignee: user,
        createdBy: req.session.uid,
        ticketId: Number(req.params.ticketId),
        deletedAt: null,
      });
    }
    await UserTicket.bulkCreate(uerTicket, {
      updateOnDuplicate: ["deletedAt"],
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    await UserTicket.destroy({ where: { ticketId: req.params.id, assignee: req.body.uid } });
    res.send(204);
  } catch (err) {
    next(err);
  }
}

router.put("/:ticketId", create);
router.delete("/:id", deleteById);

module.exports = router;
