import { test, expect, describe, beforeAll } from "@jest/globals";
import { execute, parse } from "graphql";
import schema from "../GQLSchema/private.ts";
import User from "./mockObject/users.json";

const userById = parse(`
  query UserById {
    userById(uid: "b5d6e253-9ec9-431c-9ee1-40edde0450df") {
        id
        uid
    }
  }
`);

const userWithoutId = parse(`
  query UserById {
    userById {
        id
        uid
    }
  }
`);

const userList = parse(`
  query UserList {
    userList(limit: 5) {
        rows {id}
        count
    }
  }
`);

const getAllUser = parse(`
  query UserList {
    userList {
        rows {id}
        count
    }
  }
`);

const me = parse(`
  query Me {
    me {
    id
    }
  }
`);

test("found user by id", async () => {
  const result: any = await execute({ schema, document: userById });
  expect(result).toHaveProperty("data.userById.uid", "b5d6e253-9ec9-431c-9ee1-40edde0450df");
});

test("found user without id", async () => {
  const result: any = await execute({ schema, document: userWithoutId });
  expect(result?.errors[0]?.message).toBe("Not Found");
});

describe("with limit 5", () => {
  let result: any;
  beforeAll(async () => {
    result = await execute({ schema, document: userList });
  });
  test("get user list with limit 5", () => {
    expect(result).toHaveProperty("data.userList.count", 5);
  });

  test.failing("get user list with limit 5", () => {
    expect(result).toHaveProperty("data.userList.count", 6);
  });
});

test("get all user list", async () => {
  const result: any = await execute({ schema, document: getAllUser });
  expect([20, User.length]).toContain(result.data.userList.count);
});

test("get currecnt user", async () => {
  const result: any = await execute({ schema, document: me, rootValue: { session: { uid: "fdf9db0d-d9df-4755-afd7-450e2983b32b" } } });
  expect(result).toHaveProperty("data.me.id", 7);
});
