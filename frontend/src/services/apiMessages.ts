import axios from "axios";

export interface GetMessagesArgs {
  id: string;
}

export interface SendMessageArgs {
  id: string;
  body: string;
}

export const getConversations = async (): Promise<UserType[]> => {
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

export const sendMessage = async ({ id, body }: SendMessageArgs): Promise<MessageType> => {
  const res = await axios.post(`/api/messages/send/${id}`, { body });

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};
