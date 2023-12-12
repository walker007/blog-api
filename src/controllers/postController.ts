import { Request, Response } from "express";
import { PostService } from "./../services/PostService";

const postService: PostService = new PostService();

export const createPost = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const post = await postService.createPost(request.body);
  return response.status(201).json(post);
};

export const getPostById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const post = await postService.getById(request.params.id);
  return response.status(200).json(post);
};

export const getPosts = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const posts = await postService.getAll();
  return response.status(200).json(posts);
};

export const updatePost = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const post = await postService.updatePost(request.params.id, request.body);
  return response.status(200).json(post);
};

export const deletePost = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await postService.deletePost(request.params.id);
  return response.status(204).json();
};
