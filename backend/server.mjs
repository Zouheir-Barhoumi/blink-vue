import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

// configure dotenv file
dotenv.config({
  path: join(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origins: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connection established!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
