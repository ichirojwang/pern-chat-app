import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../index.js";

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // /send/:id // sending to this id
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: { participantIds: { hasEvery: [senderId, receiverId] } },
    });

    // if a conversation between these 2 does not exist
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: senderId }, { id: receiverId }],
          },
          participantIds: [senderId, receiverId],
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
          lastMessageAt: newMessage.createdAt,
        },
      });
    }

    // socket io
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("emitted to:", receiverSocketId);
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    // we are retrieving all our messages in the convo with this particular user
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      // return just messages, and in ascending order
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getConversations = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        profilePic: true,
        updatedAt: true,
        conversations: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    console.log("Error in getConversations", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
