import { Router, Request, Response, NextFunction } from "express";
import config from "config";
import createError from "http-errors";
import { filterModelData } from "../utils/routeUtil";
import { UsersAttributes } from "../models/Users";
const { Users } = config.db.models;
const router = Router();

interface DataObject {
  [key: string]: string;
}
async function getCurrent(req: Request, res: Response, next: NextFunction) {
  const _User = await Users.findOne({
    where: { uid: req.session.uid },
  });
  if (!_User) return next(createError(404));
  res.json(_User);
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const _User = await Users.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      where: filterModelData({ model: Users, data: <DataObject>req.query }),
    });
    if (!_User) {
      return next(createError(404));
    }
    res.json(_User);
  } catch (err) {
    next(err);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const _User = await Users.findOne({
      where: { uid: req.params.uid },
    });
    if (!_User) {
      return next(createError(404));
    }
    res.json(_User);
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const _User: any = await Users.create(req.body);
    res.status(201).json({ id: _User.id });
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const _User = await Users.findOne({ where: { uid: req.params.uid } });
    if (!_User) {
      return next(createError(404));
    }
    const { $and: values } = filterModelData({ model: Users, data: req.body });
    for (const entry of values) {
      for (const [k, v] of Object.entries(entry)) {
        (_User as any)[k] = v;
      }
    }
    await _User.save();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    await Users.destroy({ where: { uid: req.params.uid } });
    res.send(204);
  } catch (err) {
    next(err);
  }
}

router.get("/search", get);
router.get("/me", getCurrent);
router.get("/:uid", getById);
router.put("/", create);
router.post("/:uid", update);
router.delete("/:uid", deleteById);

module.exports = router;
