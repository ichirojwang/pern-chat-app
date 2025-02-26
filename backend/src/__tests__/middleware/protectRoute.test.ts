import httpMocks from "node-mocks-http";
import protectRoute, { DecodedToken } from "../../middleware/protectRoute.ts";
import jwt from "jsonwebtoken";
import prisma from "../../db/prisma.ts";
import { User } from "@prisma/client";

describe("protectRoute middleware testing", () => {
  const user = {
    id: "1",
    fullName: "lebron",
    username: "lebronjames",
    profilePic: "lebronpicture.png",
  } as User;

  const decoded = { userId: user.id };

  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("allow access if valid token", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      cookies: {
        jwt: "sometoken",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(jwt, "verify").mockImplementationOnce(() => decoded);
    jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);

    await protectRoute(req, res, next);
    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });

  test("no access if no token", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await protectRoute(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData().error).toEqual("Unauthorized - No token provided");
  });

  test("no access if invalid token", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      cookies: {
        jwt: "sometoken",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(jwt, "verify").mockReturnValueOnce(undefined);

    await protectRoute(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData().error).toEqual("Unauthorized - Invalid Token");
  });

  test("no access if user not found", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      cookies: {
        jwt: "sometoken",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    jest.spyOn(jwt, "verify").mockImplementationOnce(() => decoded);
    jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);

    await protectRoute(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData().error).toEqual("User not found");
  });
});
