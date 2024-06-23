import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
