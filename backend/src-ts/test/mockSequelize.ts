import config from "config";
import instances from "./mockObject/index";
type sequelizeMethod = (...args: any[]) => any;

function filter(obj: Object, where: Object) {
  for (const ele in where) if (`${where[ele]}`.toLowerCase() !== `${obj[ele]}`.toLowerCase()) return false;
  return true;
}

const findByPk = function (instance: any): sequelizeMethod {
  return function (id) {
    if (instances[instance]) {
      return instances[instance].find((item: Object) => {
        return filter(item, { [config.db.models[instance].primaryKeyAttribute]: id });
      });
    }
  };
};

const findOne = function (instance: any): sequelizeMethod {
  return function ({ where = {} } = {}) {
    if (instances[instance]) {
      return instances[instance].find((item: Object) => {
        return filter(item, where);
      });
    }
  };
};

const findAndCountAll = function (instance: any): sequelizeMethod {
  return function ({ where = {}, limit, offset } = {}) {
    if (instances[instance]) {
      const result = instances[instance].reduce((data: any, current: Object) => {
        const currentItem = filter(current, where.$and);
        if (currentItem) return [...data, current];
        return data;
      }, []);
      const modifyLimit = limit ? limit + offset : instances[instance].length;
      const finalResult = result.slice(offset, modifyLimit);
      return { count: finalResult.length || 0, rows: finalResult };
    }
  };
};

for (const instance in config.db.models) {
  (config.db.models[instance].findOne as sequelizeMethod) = findOne(instance);
  (config.db.models[instance].findAndCountAll as sequelizeMethod) = findAndCountAll(instance);
  (config.db.models[instance].findByPk as sequelizeMethod) = findByPk(instance);
}
