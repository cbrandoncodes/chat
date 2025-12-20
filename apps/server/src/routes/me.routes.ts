import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "@/lib/auth";

const router = Router();

router.get("/", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

router.get("/sign-out", async (req, res) => {
  const result = await auth.api.signOut({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(result);
});

export default router;
