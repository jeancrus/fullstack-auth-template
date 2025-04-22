import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const fakeUser = {
      id: String(7),
      name: "Jean Carlos",
      email: "jean@email.com",
      password: "123456",
      role: "customer",
    };

    if (email !== fakeUser.email || password !== fakeUser.password) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        role: fakeUser.role,
      },
      secret,
      {
        subject: String(fakeUser.id),
        expiresIn,
      }
    );

    return response.json({ token });
  }
}

export { SessionsController };
