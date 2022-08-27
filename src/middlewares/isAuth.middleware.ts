import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserModel from "../models/user.model";

async function isAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.context?.token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  try {
    const service = new AuthService(new UserModel());
    const decodedToken = service.verifyToken(req.context.token);
    const user = await service.getUser(decodedToken.id);
    if (!user) {
      return res.status(401).send({ auth: false, message: "User not found." });
    }
    if (user.token !== req.context.token) {
      return res.status(401).send({ auth: false, message: "Invalid token." });
    }
    req.context = {
      ...req.context,
      user,
    };
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
}

export default isAuthMiddleware;
