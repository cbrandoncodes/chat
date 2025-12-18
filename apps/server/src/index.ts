import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";

import { auth } from "./lib/auth";

config();

const app = express();
const port = process.env.PORT || 5050;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
