"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var socket = (0, socket_io_client_1.io)("http://localhost:5000", {
    transports: ["websocket"],
});
socket.on("connect", function () {
    console.log("Connected to server");
    // Join a chat room
    var joinData = { chatId: "testRoom", userId: "user1" };
    socket.emit("join", joinData, function (error) {
        if (error) {
            console.log("Error joining chat room:", error);
        }
        else {
            console.log("Joined chat room successfully", joinData.chatId);
        }
    });
    // Send a message
    var messageData = {
        chatId: "testRoom",
        senderId: "user1",
        receiverId: "user2",
        content: "Hello, this is a test message!",
    };
    socket.emit("message", messageData);
    // Listen for new messages
    socket.on("newMessage", function (message) {
        console.log("New message received:", message);
    });
    // Typing indicator
    var typingData = { chatId: "testRoom", user: "user1" };
    socket.emit("typing", typingData);
    socket.emit("stopTyping", typingData);
});
socket.on("disconnect", function () {
    console.log("Disconnected from server");
});
socket.on("error", function (error) {
    console.log("Error:", error);
});
socket.on("joined", function (userId) {
    console.log("User ".concat(userId, " joined the room"));
});
