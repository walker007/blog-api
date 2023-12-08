import { Router } from "express";
import { UserController } from "../../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", userController.saveUser);
userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);

export { userRoutes };
