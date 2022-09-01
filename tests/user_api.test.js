const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialUsers = [
  {
    username: "User 1",
    name: "Alberto",
    passwordHash: "passwordHash1",
  },
  {
    username: "User 2",
    name: "Ana",
    passwordHash: "passwordHash2",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
});

describe("addition of a new user", () => {
  test("invalid add user operation returns a suitable status code and error message", async () => {
    const newUser = {
      username: "Us",
      name: "Alberto",
      password: "password3",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    expect(response.body.error).toContain(
      "username must be at least 3 characters long"
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
