import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", (req, res) => {
  res.send("Realiza Login.");
});

export { authRoutes };
