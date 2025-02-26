import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "../../db/prisma.ts";
import { jest, expect, test } from "@jest/globals";
import { User } from "@prisma/client";
import { app } from "../../index.ts";

jest.mock("../../db/prisma.ts", () => ({
  user: {
    findUnique: jest.fn(() => null),
    create: jest.fn(() => ({
      id: 1,
      fullName: "LeBron James",
      username: "lebronjames",
      profilePic: "lebronpicture.png",
    })),
  },
}));

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(() => "salt"),
  hash: jest.fn((password: string, salt: string) => salt + password),
  compare: jest.fn((a: string, b: string) => a === b),
}));

jest.mock("../../utils/generateToken.ts");

// a default user for testing
const existingUser = {
  id: "1",
  fullName: "lebron",
  username: "lebronjames",
  profilePic: "lebronpicture.png",
} as User;

// afterAll((done) => {
//   server.close(); // close server to avoid open handle
//   done();
// });

describe("signup route tests", () => {
  const SIGNUP = "/api/auth/signup";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("successful signup", async () => {
    const res = await request(app).post(SIGNUP).send({
      fullName: "lebron james",
      username: "lebronjames",
      password: "password",
      confirmPassword: "password",
      gender: "male",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("signup missing fields", async () => {
    // test different invalid inputs
    const inputs = [
      {
        fullName: "LeBron James",
        username: "lebronjames",
        password: "password",
        confirmPassword: "password",
      },
      {
        fullName: "LeBron James",
        password: "password",
        gender: "male",
      },
      {},
    ];
    for (const input of inputs) {
      // expect error since inputs are not valid
      const res = await request(app).post(SIGNUP).send(input);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual("Please fill in all fields");
    }
  });

  test("signup not matching passwords", async () => {
    const res = await request(app).post(SIGNUP).send({
      fullName: "lebron james",
      username: "lebronjames",
      password: "password",
      confirmPassword: "badpassword",
      gender: "male",
    });

    // expect error since passwords must match
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual("Passwords don't match");
  });

  test("signup with duplicate username", async () => {
    const spy = jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(existingUser);

    const res = await request(app).post(SIGNUP).send({
      fullName: "lebron james",
      username: "lebronjames",
      password: "password",
      confirmPassword: "password",
      gender: "male",
    });

    // expect error since cannot have same usernames
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual("Username already exists");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ where: { username: "lebronjames" } });
  });
});

describe("login route tests", () => {
  const LOGIN = "/api/auth/login";

  test("successful login", async () => {
    const spy = jest
      .spyOn(prisma.user, "findUnique")
      .mockResolvedValueOnce({ ...existingUser, password: "password" });

    const res = await request(app).post(LOGIN).send({
      username: "lebronjames",
      password: "password",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(spy).toHaveBeenCalledWith({ where: { username: "lebronjames" } });
  });

  test("bad login (no user found)", async () => {
    // dont need to mock findUnique since we handle that (see top of file)

    const res = await request(app).post(LOGIN).send({
      username: "lebronjames",
      password: "password",
    });

    // if no user with those credentials found, error
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual("Invalid credentials");
  });

  test("bad login (not matching password)", async () => {
    const spy = jest
      .spyOn(prisma.user, "findUnique")
      .mockResolvedValueOnce({ ...existingUser, password: "badpassword" });

    const res = await request(app).post(LOGIN).send({
      username: "lebronjames",
      password: "password",
    });

    // if password is not matching, then error
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual("Invalid credentials");
  });
});

describe("me route tests (check if user is already logged in)", () => {
  const ME = "/api/auth/me";

  const user = {
    id: "1",
    fullName: "lebron",
    username: "lebronjames",
    profilePic: "lebronpicture.png",
  } as User;
  const token = "test-token";
  const decoded = { userId: user.id };

  test("if user logged in, then return that user", async () => {
    jest.spyOn(jwt, "verify").mockImplementationOnce(() => decoded);
    const spy = jest.spyOn(prisma.user, "findUnique").mockResolvedValue(existingUser);

    const res = await request(app)
      .get(ME)
      .set("Cookie", [`jwt=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe("1");
  });
});
