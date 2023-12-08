import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "@prisma/client";

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(request: Request, response: Response): Promise<Response> {
    const users: User[] = await this.userService.getUsers();
    return response.status(200).json(users);
  }

  async getUser(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id;
    try {
      const user: User = await this.userService.getUserById(id);
      return response.status(200).json(user);
    } catch (e: any) {
      return response.status(404).json({
        message: e.message,
      });
    }
  }

  async saveUser(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const user: User = await this.userService.createUser(data);
    return response.status(201).json(user);
  }
}
