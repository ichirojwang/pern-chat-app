type UserType = {
  id: string;
  fullName: string;
  username: string;
  profilePic: string;
};

type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
};

type MessageType = {
  id: string;
  body: string;
  conversationId: string;
  senderId: string;
  createdAt: string;
  shouldShake?: boolean;
};
