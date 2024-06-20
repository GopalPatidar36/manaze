const sequelize = require("sequelize");

function filterOperations(update, item, key) {
  const entry = {};
  entry[key] = item;
  if (item.startsWith("%") || item.endsWith("%")) {
    entry[key] = { $like: item };
  } else if (item.startsWith("gt:")) {
    entry[key] = { $gt: item.substring(3) };
  } else if (item.startsWith("gte:")) {
    entry[key] = { $gte: item.substring(4) };
  } else if (item.startsWith("lt:")) {
    entry[key] = { $lt: item.substring(3) };
  } else if (item.startsWith("lte:")) {
    entry[key] = { $lte: item.substring(4) };
  } else if (item.startsWith("ne:")) {
    const value = item.substring(3);
    entry[key] = { $ne: value === "null" ? null : value };
  }
  update.push(entry);
}

function getOrderData({ model, data }) {
  const directions = { asc: "ASC", desc: "DESC" };
  const order = [];
  const sort = Array.isArray(data.order) ? data.order : [data.order || ""];
  for (const item of sort) {
    const [field, dir = directions.desc] = item.split(":");
    if (model.tableAttributes[field]) {
      order.push([field, directions[dir.toLowerCase()] || directions.desc]);
    }
  }
  return order;
}

function filterModelData({ model, data, userId }) {
  const keys = Object.keys(model.tableAttributes);
  const virtualKeys = Array.from(model._virtualAttributes);

  const update = new Map([
    ["$and", []],
    ["$or", []],
  ]);
  for (const [key, value] of Object.entries(data)) {
    if (keys.includes(key)) {
      const items = Array.isArray(value) ? value : [value];
      for (let item of items) {
        item = `${item}`;
        let arr = update.get("$and");
        if (item !== null && item.startsWith("or|")) {
          item = item.substring(3);
          arr = update.get("$or");
        }
        if (typeof item !== "string") {
          arr.push({ [key]: item });
        } else {
          filterOperations(arr, item, key);
        }
      }
    } else if (virtualKeys.includes(key)) {
      const cols = ["concat_ws", " "];
      for (const field of model.rawAttributes[key].type.fields) {
        cols.push(sequelize.col(field));
      }
      const arr = value.startsWith("or|") ? update.get("$or") : update.get("$and");
      const whereClause = value.startsWith("or|") ? { $like: `%${value.substring(3)}%` } : { $like: `%${value}%` };
      const item = sequelize.where(sequelize.fn(...cols), whereClause);
      arr.push({ key: item });
    }
  }

  if (update.get("$or").length === 0) update.delete("$or");
  return Object.fromEntries(update);
}

module.exports = {
  filterModelData,
  getOrderData,
};
