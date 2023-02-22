import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDb from "./mongodb/connect.js";

import postRoutes from "./routes/postsRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts/", postRoutes);
app.use("/api/v1/dalle/", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Dalle");
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(4000, console.log(`Server running at http://localhost:4000`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
