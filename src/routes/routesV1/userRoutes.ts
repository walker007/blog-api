import { UserService } from "./../../services/UserService";
import { Router } from "express";
import * as userController from "../../controllers/userController";

const userRoutes = Router();

userRoutes.post("/users", userController.saveUser);
userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:id", userController.getUser);

export { userRoutes };
