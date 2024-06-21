const router = require("express").Router();
const config = require("config");
const createError = require("http-errors");
const { User } = config.db.models;
const { filterModelData } = require("../utils/routeUtil");

async function getCurrent(req, res, next) {
  const _User = await User.findOne({
    where: { uid: req.session.uid },
  });
  if (!_User) return next(createError(404));
  res.json(_User);
}

async function get(req, res, next) {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const _User = await User.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      where: filterModelData({ model: User, data: req.query }),
    });
    if (!_User) {
      return next(createError(404));
    }
    res.json(_User);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const _User = await User.findOne({
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

async function create(req, res, next) {
  try {
    const _User = await User.create(req.body);
    res.status(201).json({ id: _User.id });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const _User = await User.findOne({ where: { uid: req.params.uid } });
    if (!_User) {
      return next(createError(404));
    }
    const { $and: values } = filterModelData({ model: User, data: req.body });
    for (const entry of values) {
      for (const [k, v] of Object.entries(entry)) {
        _User[k] = v;
      }
    }
    await _User.save({ userId: req.session.userId });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function deleteById(req, res, next) {
  try {
    await User.destroy({ where: { id: req.params.id } });
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
router.delete("/:id", deleteById);

module.exports = router;
