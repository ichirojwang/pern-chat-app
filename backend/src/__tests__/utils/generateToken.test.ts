import httpMocks from "node-mocks-http";
import jwt from "jsonwebtoken";
import generateToken from "../../utils/generateToken.ts";

describe("generateToken util testing", () => {
  const DAYS = 7; // how long jwt should last, set in generateToken
  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
    process.env.NODE_ENV = "test";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("return a token", () => {
    const userId = "1";
    const res = httpMocks.createResponse();

    const spySign = jest.spyOn(jwt, "sign");

    const token = generateToken(userId, res);

    expect(token).toBeDefined();
    expect(spySign).toHaveBeenCalledWith({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    const jwtCookie = res.cookies.jwt;
    expect(jwtCookie).toBeDefined();
    expect(jwtCookie.value).toEqual(token);
    expect(jwtCookie.options.maxAge).toEqual(DAYS * 24 * 60 * 60 * 1000);
    expect(jwtCookie.options.httpOnly).toBe(true);
    expect(jwtCookie.options.sameSite).toEqual("strict");
    expect(jwtCookie.options.secure).toEqual(process.env.NODE_ENV !== "development");
  });
});
