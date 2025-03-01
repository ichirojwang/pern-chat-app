import axios from "axios";

export interface GetMessagesArgs {
  id: string;
}

export interface SendMessageArgs {
  id: string;
  message: string;
}

export const getConversations = async (): Promise<ConversationType[]> => {
  const res = await axios.get("/api/messages/conversations");

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const getMessages = async ({ id }: GetMessagesArgs): Promise<MessageType[]> => {
  const res = await axios.get(`/api/messages/${id}`);

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const sendMessage = async ({ id, message }: SendMessageArgs): Promise<MessageType> => {
  const res = await axios.post(`/api/messages/send/${id}`, { message });

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};
