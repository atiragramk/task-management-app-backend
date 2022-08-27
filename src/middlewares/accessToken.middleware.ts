import { NextFunction, Request, Response } from "express";

function accessTokenMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[0];
  if (token) {
    req.context = {
      token: String(token),
    };
  }
  next();
}

export default accessTokenMiddleware;
