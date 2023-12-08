import { Router } from "express";

const postRoutes = Router();

postRoutes.get("/posts", (req, res) => {
  res.send("Lista posts.");
});

postRoutes.get("/posts/:id", (req, res) => {
  res.send("Lista post por id.");
});

postRoutes.post("/posts", (req, res) => {
  res.send("Cadastra post.");
});

postRoutes.put("/posts/:id", (req, res) => {
  res.send("Atualiza post por id.");
});

postRoutes.delete("/posts/:id", (req, res) => {
  res.send("Apaga post por id.");
});

export { postRoutes };
