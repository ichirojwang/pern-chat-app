import { jest, expect, test } from "@jest/globals";
import httpMocks from "node-mocks-http";
import { login, signup } from "../../controllers/auth.controller.ts";
import prisma from "../../db/prisma.ts";
import { User } from "@prisma/client";

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("successful signup", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        fullName: "lebron james",
        username: "lebronjames",
        password: "password",
        confirmPassword: "password",
        gender: "male",
      },
    });
    const res = httpMocks.createResponse();

    await signup(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData().id).toBeDefined();
  });

  test("signup missing fields", async () => {
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
      const req = httpMocks.createRequest({
        method: "POST",
        body: input,
      });
      const res = httpMocks.createResponse();

      await signup(req, res);
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData().error).toEqual("Please fill in all fields");
    }
  });

  test("signup not matching passwords", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        fullName: "lebron james",
        username: "lebronjames",
        password: "password",
        confirmPassword: "badpassword",
        gender: "male",
      },
    });
    const res = httpMocks.createResponse();

    await signup(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual("Passwords don't match");
  });

  test("signup with duplicate username", async () => {
    const spy = jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(existingUser);

    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        fullName: "lebron james",
        username: "lebronjames",
        password: "password",
        confirmPassword: "password",
        gender: "male",
      },
    });
    const res = httpMocks.createResponse();

    await signup(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual("Username already exists");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ where: { username: "lebronjames" } });
  });
});

describe("login route tests", () => {
  test("successful login", async () => {
    const spy = jest
      .spyOn(prisma.user, "findUnique")
      .mockResolvedValueOnce({ ...existingUser, password: "password" });

    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "lebronjames",
        password: "password",
      },
    });
    const res = httpMocks.createResponse();

    await login(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().id).toBeDefined();
    expect(spy).toHaveBeenCalledWith({ where: { username: "lebronjames" } });
  });
  test("bad login (no user found)", async () => {
    const spy = jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "lebronjames",
        password: "password",
      },
    });
    const res = httpMocks.createResponse();

    await login(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual("Invalid credentials");
  });

  test("bad login (not matching password)", async () => {
    const spy = jest
      .spyOn(prisma.user, "findUnique")
      .mockResolvedValueOnce({ ...existingUser, password: "badpassword" });

    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        username: "lebronjames",
        password: "password",
      },
    });
    const res = httpMocks.createResponse();

    await login(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toEqual("Invalid credentials");
  });
});

// describe("getMe (check if user is already logged in", () => {
//   test("if user logged in, then return that user",async()=>{
//     const req =
//   });
// });
