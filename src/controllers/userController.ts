import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "@prisma/client";
import { checkSchema, validationResult } from "express-validator";

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
  const validations = await checkSchema({
    email: {
      isEmail: true,
      notEmpty: true,
      custom: {
        options: async (value) => {
          const userService: UserService = new UserService();
          try {
            const user = await userService.getUserByEmail(value);
            if (user) {
              return false;
            }
            return true;
          } catch (error: any) {
            return true;
          }
        },
      },
    },
    birthDate: { notEmpty: true },
    name: {
      notEmpty: true,
      isLength: {
        options: {
          min: 4,
        },
        errorMessage: "Informe seu nome completo",
      },
    },
    password: {
      isLength: {
        options: {
          min: 8,
          max: 20,
        },
        errorMessage: "Sua senha deve conter entre 8 e 20 caracteres",
      },
      notEmpty: true,
    },
    gender: {
      notEmpty: true,
      custom: {
        options: (value) => {
          return ["Male", "Female"].includes(value);
        },
      },
    },
  }).run(request);
  const errosArray = [];
  for (let validation of validations) {
    if (validation.isEmpty()) {
      continue;
    }

    errosArray.push(...validation.array());
  }

  if (errosArray.length > 0) {
    return response.status(422).json({
      message: "Tá viajando parça?",
      errors: errosArray,
    });
  }

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
