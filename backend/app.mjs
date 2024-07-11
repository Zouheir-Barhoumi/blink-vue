import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.mjs";
import usersRoutes from "./routes/usersRoutes.mjs";
import messagesRoutes from "./routes/messagesRoutes.mjs";
import chatSocket from "./sockets/chatSocket.mjs";
import * as OpenApiValidator from "express-openapi-validator";
import verifyToken from "./middleware/tokenVerifier.mjs";

// configure dotenv file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  }),
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connection established!"))
  .catch((err) => console.log(err));

// Create an API router
const apiRouter = express.Router();

// Apply OpenAPI validator middleware to the API router
apiRouter.use(
  OpenApiValidator.middleware({
    apiSpec: "./specs.yaml",
    validateRequests: true,
    validateResponses: true,
  }),
);

// Define API routes
apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", verifyToken, usersRoutes);
apiRouter.use("/messages", verifyToken, messagesRoutes);

// Use the API router for all /api routes
app.use("/api", apiRouter);

// Attach the socket handler
chatSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
