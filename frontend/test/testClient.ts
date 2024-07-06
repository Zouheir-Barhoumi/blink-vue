import { io, Socket } from "socket.io-client";
// const io = require("socket.io-client");

interface JoinData {
  chatId: string;
  userId: string;
}

interface MessageData {
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
}

interface TypingData {
  chatId: string;
  user: string;
}

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to server");

  // Join a chat room
  const joinData: JoinData = { chatId: "testRoom", userId: "user1" };
  socket.emit("join", joinData, (error: string) => {
    if (error) {
      console.log("Error joining chat room:", error);
    } else {
      console.log("Joined chat room successfully", joinData.chatId);
    }
  });

  // Send a message
  const messageData: MessageData = {
    chatId: "testRoom",
    senderId: "user1",
    receiverId: "user2",
    content: "Hello, this is a test message!",
  };
  socket.emit("message", messageData);

  // Listen for new messages
  socket.on("newMessage", (message: MessageData) => {
    console.log("New message received:", message);
  });

  // Typing indicator
  const typingData: TypingData = { chatId: "testRoom", user: "user1" };
  socket.emit("typing", typingData);
  socket.emit("stopTyping", typingData);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("error", (error: string) => {
  console.log("Error:", error);
});

socket.on("joined", (userId: string) => {
  console.log(`User ${userId} joined the room`);
});
