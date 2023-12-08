import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { postRoutes } from "./postRoutes";

const routesV1 = Router();

routesV1.use(authRoutes);
routesV1.use(userRoutes);
routesV1.use(postRoutes);

export default routesV1;
