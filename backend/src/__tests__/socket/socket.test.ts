import http from "http";
import { Server } from "socket.io";
import { io as ioc, Socket as ClientSocket } from "socket.io-client";
import { getReceiverSocketId, initSocket } from "../../socket/socket.ts";
import { AddressInfo } from "net";
import { jest, expect, test } from "@jest/globals";

describe("socket server test", () => {
  let httpServer: http.Server;
  let ioServer: Server;
  let port: number;

  const waitForOnlineUsers = (socket: ClientSocket): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      socket.once("getOnlineUsers", (onlineUsers: string[]) => {
        resolve(onlineUsers);
      });
    });
  };

  // start the server before running tests
  beforeAll((done) => {
    httpServer = http.createServer();
    ioServer = initSocket(httpServer);
    httpServer.listen(() => {
      port = (httpServer.address() as AddressInfo).port;
      done();
      console.log("before all");
    });
  });

  // clean up after tests
  afterAll((done) => {
    ioServer.close();
    httpServer.close(done);
    console.log("after all");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add user and emit getOnlineUsers on connection", (done) => {
    const userId = "1";
    // connect a client with userId "1"
    const clientSocket: ClientSocket = ioc(`http://localhost:${port}`, {
      query: { userId },
    });

    let error: any = null;
    // listen for the "getOnlineUsers" event
    clientSocket.on("getOnlineUsers", (onlineUsers: string[]) => {
      try {
        // expect the online users list to include "user1"
        expect(onlineUsers.length).toEqual(1);
        expect(onlineUsers).toContain(userId);

        // verify that getReceiverSocketId returns the same socket id
        const socketId = getReceiverSocketId(userId);
        expect(socketId).toEqual(clientSocket.id);
      } catch (err) {
        error = err;
      } finally {
        clientSocket.close();
        done(error);
      }
    });
  });

  test("should remove a user on disconnect", async () => {
    const userId1 = "1";
    const userId2 = "2";
    // connect a client with userid "user1"
    const clientSocket1: ClientSocket = ioc(`http://localhost:${port}`, {
      query: { userId: userId1 },
    });

    const clientSocket2: ClientSocket = ioc(`http://localhost:${port}`, {
      query: { userId: userId2 },
    });

    await new Promise<void>((resolve) => clientSocket1.once("connect", resolve));
    await new Promise<void>((resolve) => clientSocket2.once("connect", resolve));

    // check online users from client 1
    // should be 2 users
    const onlineUsersBefore = await waitForOnlineUsers(clientSocket1);
    expect(onlineUsersBefore.length).toEqual(2);
    expect(onlineUsersBefore).toEqual(expect.arrayContaining([userId1, userId2]));

    const socketId2Before = getReceiverSocketId(userId2);
    expect(socketId2Before).toBeDefined();
    expect(socketId2Before).toEqual(clientSocket2.id);

    // disconnect client 2
    clientSocket2.close();

    // after client 2 disconnect, only 1 user online
    const onlineUsersAfter = await waitForOnlineUsers(clientSocket1);
    expect(onlineUsersAfter.length).toEqual(1);
    expect(onlineUsersAfter).toContain(userId1);
    const socketId2After = getReceiverSocketId(userId2);
    expect(socketId2After).toBeUndefined();

    clientSocket1.close();
  });
});
