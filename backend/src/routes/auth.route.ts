// /api/auth

import express, { Request, Response } from "express";
import { login, logout, signup, getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.post("/test", async (req: Request, res: Response): Promise<void> => {
  console.log("test");
  const { password, username } = req.body;
  if (!password || !username) {
    res.sendStatus(400);
    return;
  }

  res.send({ userId: 0 });
});
router.get("/test", (req: Request, res: Response): void => {
  res.send([]);
});

export default router;
