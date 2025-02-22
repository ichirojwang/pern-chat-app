import request from "supertest";
import prisma from "../../db/prisma.ts";
import { jest, expect, test } from "@jest/globals";
import { Conversation, Message, User } from "@prisma/client";
import { app } from "../../index.ts";
import { NextFunction, Request, Response } from "express";

// a default user for testing
const user = {
  id: "1",
  fullName: "lebron",
  username: "lebronjames",
  profilePic: "lebronpicture.png",
} as User;

const user2 = {
  id: "2",
  fullName: "bronny",
  username: "bronnyjames",
  profilePic: "bronny.png",
} as User;

const user3 = {
  id: "3",
  fullName: "bryce",
  username: "bryce",
  profilePic: "bryce.png",
} as User;

const messages = [
  { id: "msg1", body: "Hi", senderId: user.id, createdAt: new Date() },
  { id: "msg2", body: "Hello", senderId: user2.id, createdAt: new Date() },
] as Message[];
const conversation = {
  id: "c1",
  participantIds: [user.id, user2.id],
  messages,
} as unknown as Conversation;

// mocking protect route middleware and adding user to request
jest.mock("../../middleware/protectRoute.ts", () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.user = user;
    next();
  };
});

describe("send message tests", () => {
  const SEND_ROUTE = "/api/messages/send/2";

  const newConversation = {
    id: "c1",
    participantIds: [user.id, user2.id],
  } as unknown as Conversation;

  jest.spyOn(prisma.conversation, "findFirst").mockResolvedValue(newConversation);
  jest.spyOn(prisma.message, "create").mockResolvedValue(messages[0]);
  jest
    .spyOn(prisma.conversation, "update")
    .mockResolvedValue({ ...newConversation, messages: [messages[0]] } as any);

  test("send a message successfully", async () => {
    // request body contains message (string)
    const res = await request(app).post(SEND_ROUTE).send({ message: "a message" });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});

describe("get messages route tests (:/id)", () => {
  const MESSAGES_ROUTE = "/api/messages/random_id";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("get messages from a conversation with another user", async () => {
    jest.spyOn(prisma.conversation, "findFirst").mockResolvedValue(conversation);

    const res = await request(app).get(MESSAGES_ROUTE);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[1].id).toBe("msg2");
  });

  test("return empty messages array if conversation not started yet", async () => {
    jest.spyOn(prisma.conversation, "findFirst").mockResolvedValue(null);
    const res = await request(app).get(MESSAGES_ROUTE);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

describe("conversation route tests", () => {
  const CONVERSATIONS = "/api/messages/conversations";

  test("get conversations to show on sidebar", async () => {
    jest.spyOn(prisma.user, "findMany").mockResolvedValue([user2, user3]);

    const res = await request(app).get(CONVERSATIONS);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(2);
    expect(res.body).toEqual(expect.arrayContaining([user2, user3]));
  });
});
