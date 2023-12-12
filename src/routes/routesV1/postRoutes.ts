import { Router } from "express";
import * as postController from "../../controllers/postController";

const postRoutes = Router();

postRoutes.get("/posts", postController.getPosts);
postRoutes.get("/posts/:id", postController.getPostById);
postRoutes.post("/posts", postController.createPost);
postRoutes.put("/posts/:id", postController.updatePost);
postRoutes.delete("/posts/:id", postController.deletePost);

export { postRoutes };
