// test/socket.test.ts
import { io, Socket } from "socket.io-client";
import { expect } from "chai";

describe("Socket.IO Server", () => {
  let socket: Socket;

  beforeEach((done) => {
    // Connect to the server
    socket = io("http://localhost:5000");
    socket.on("connect", done);
  });

  afterEach((done) => {
    // Disconnect from the server
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it("should join a chat room", (done) => {
    socket.emit("join", { chatId: "testRoom", userId: "user1" });
    socket.on("joined", (userId: string) => {
      expect(userId).to.equal("user1");
      done();
    });
  });

  it("should send and receive a message", (done) => {
    socket.emit("message", {
      chatId: "testRoom",
      senderId: "user1",
      receiverId: "user2",
      content: "Hello, this is a test message!",
    });

    socket.on("newMessage", (message: { content: string }) => {
      expect(message.content).to.equal("Hello, this is a test message!");
      done();
    });
  });

  it("should handle typing events", (done) => {
    socket.emit("typing", { chatId: "testRoom", user: "user1" });
    socket.emit("stopTyping", { chatId: "testRoom", user: "user1" });

    socket.on("typing", (user: string) => {
      expect(user).to.equal("user1");
    });

    socket.on("stopTyping", (user: string) => {
      expect(user).to.equal("user1");
      done();
    });
  });
});
