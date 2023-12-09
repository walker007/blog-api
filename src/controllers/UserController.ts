import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "@prisma/client";

const userService: UserService = new UserService();
export const getUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users: User[] = await userService.getUsers();
  return response.status(200).json(users);
};

export const getUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: string = request.params.id;
  try {
    const user: User = await userService.getUserById(id);
    return response.status(200).json(user);
  } catch (e: any) {
    return response.status(404).json({
      message: e.message,
    });
  }
};

export const saveUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data = request.body;
  const birthDateArray = data.birthDate.split("-");

  data.birthDate = new Date(
    birthDateArray[0],
    birthDateArray[1] - 1,
    birthDateArray[2]
  );

  const user: User = await userService.createUser(data);
  return response.status(201).json(user);
};
