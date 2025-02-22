import httpMocks from "node-mocks-http";
import protectRoute from "../../middleware/protectRoute.ts";
import jwt from "jsonwebtoken";
import prisma from "../../db/prisma.ts";

describe("protectRoute middleware testing", () => {
  const user = {
    id: "1",
    fullName: "lebron",
    username: "lebronjames",
    profilePic: "lebronpicture.png",
  };

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

    jest.spyOn(jwt, "verify").mockReturnValueOnce(decoded as any);
    jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user as any);

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

    jest.spyOn(jwt, "verify").mockReturnValueOnce(undefined as any);

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

    jest.spyOn(jwt, "verify").mockReturnValueOnce(decoded as any);
    jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(undefined as any);

    await protectRoute(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData().error).toEqual("User not found");
  });
});
