"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test/socket.test.ts
var socket_io_client_1 = require("socket.io-client");
var chai_1 = require("chai");
describe("Socket.IO Server", function () {
    var socket;
    beforeEach(function (done) {
        // Connect to the server
        socket = (0, socket_io_client_1.io)("http://localhost:5000");
        socket.on("connect", done);
    });
    afterEach(function (done) {
        // Disconnect from the server
        if (socket.connected) {
            socket.disconnect();
        }
        done();
    });
    it("should join a chat room", function (done) {
        socket.emit("join", { chatId: "testRoom", userId: "user1" });
        socket.on("joined", function (userId) {
            (0, chai_1.expect)(userId).to.equal("user1");
            done();
        });
    });
    it("should send and receive a message", function (done) {
        socket.emit("message", {
            chatId: "testRoom",
            senderId: "user1",
            receiverId: "user2",
            content: "Hello, this is a test message!",
        });
        socket.on("newMessage", function (message) {
            (0, chai_1.expect)(message.content).to.equal("Hello, this is a test message!");
            done();
        });
    });
    it("should handle typing events", function (done) {
        socket.emit("typing", { chatId: "testRoom", user: "user1" });
        socket.emit("stopTyping", { chatId: "testRoom", user: "user1" });
        socket.on("typing", function (user) {
            (0, chai_1.expect)(user).to.equal("user1");
        });
        socket.on("stopTyping", function (user) {
            (0, chai_1.expect)(user).to.equal("user1");
            done();
        });
    });
});
