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
