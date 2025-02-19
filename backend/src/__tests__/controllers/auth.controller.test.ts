import request from "supertest";
import { server } from "../../index.js";

describe("POST /test", () => {
  describe("given a username and password", () => {
    // post username and password
    // respond with json containing user ID
    test("should respond with 20 status code", async () => {
      const res = await request(server).post("/test").send({
        username: "joe",
        password: "mama",
      });
      expect(res.statusCode).toBe(200);
    });
    // status 200
    // server specifies json in content type header
  });

  describe("when username or password is missing", () => {
    // status 400
  });
});
