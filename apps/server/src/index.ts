import { config } from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";

import { initSocket } from "./socket";
import authRoutes from "./routes/auth.routes";
import meRoutes from "./routes/me.routes";

config();

const app = express();

const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);

const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
