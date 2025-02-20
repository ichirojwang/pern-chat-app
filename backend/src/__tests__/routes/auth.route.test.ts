import request from "supertest";
import { server } from "../../index.ts";

describe("authentication route tests", () => {
  afterAll((done) => {
    server.close(); // close server to avoid open handle
    done();
  });

  test("GET /me", async () => {
    const res = await request(server).get("/api/auth/me");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toContain("Unauthorized");
  });

  test("GET /test", async () => {
    const res = await request(server).get("/api/auth/test");
    expect(res.body).toEqual({ message: "auth test route" });
    expect(res.statusCode).toBe(200);
  });

  test("POST /test", async () => {
    const res = await request(server).post("/api/auth/test").send({
      username: "joe",
      password: "mama",
    });
    expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toBeDefined();
  });
});
