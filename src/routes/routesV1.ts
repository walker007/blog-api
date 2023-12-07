import express from "express";

const routesV1 = express.Router();

routesV1.post("/users", (req, res) => {
  res.send("Cadastra um usuário.");
});
routesV1.get("/users", (req, res) => {
  res.send("Lista todos os usuários.");
});
routesV1.post("/users/login", (req, res) => {
  res.send("Realiza Login.");
});
routesV1.get("/users/:id", (req, res) => {
  res.send("Lista usuário por id.");
});

routesV1.get("/posts", (req, res) => {
  res.send("Lista posts.");
});
routesV1.get("/posts/:id", (req, res) => {
  res.send("Lista post por id.");
});
routesV1.post("/posts", (req, res) => {
  res.send("Cadastra post.");
});
routesV1.put("/posts/:id", (req, res) => {
  res.send("Atualiza post por id.");
});
routesV1.delete("/posts/:id", (req, res) => {
  res.send("Apaga post por id.");
});

export default routesV1;
