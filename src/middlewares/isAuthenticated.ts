import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  sub: string;
  role: string;
}

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is required", 401);
  }

  const [, token] = authHeader.split(" ");

  const { sub: user_id, role } = verify(
    token,
    authConfig.jwt.secret
  ) as ITokenPayload;

  request.user = {
    id: String(user_id),
    role,
  };

  return next();
}

export { isAuthenticated };
