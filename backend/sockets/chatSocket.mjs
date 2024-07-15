import { Server } from "socket.io";
import Message from "../models/message.mjs";

const chatSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:5000"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (data) => {
      const { chatId, userId } = data;
      // Associate the socket with the user (e.g., store in memory or database)
      socket.join(chatId);
      socket.emit("joined", userId);
    });

    // Saves a new message to the database and emits the new message to all clients in the same chat room.
    socket.on("message", async (data) => {
      try {
        const message = new Message(data);
        await message.save().then(() => {
          io.to(data.chatId).emit("newMessage", message);
        });
      } catch (error) {
        console.log(`Error saving message: ${error}`);
      }
    });

    // Emits a "typing" event to the recepient in the same chat room, indicating that a user is typing.
    socket.on("typing", (data) => {
      // io.to(data.chatId).emit("typing", data);
      socket.emit("typing", data.userId)
    });

    // Emits a "stopTyping" event to recepient in the same chat room, indicating that a user has stopped typing.
    socket.on("stopTyping", (data) => {
      // socket.broadcast.to(data.chatId).emit("stopTyping", data.user);
      socket.emit("stopTyping", data.userId)
    });

    // Logs a message when a user disconnects from the socket.
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default chatSocket;
