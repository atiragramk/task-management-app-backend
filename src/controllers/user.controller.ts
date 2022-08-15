import { BasicController } from "./basic.controller";
import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController extends BasicController {
  constructor(private userService: UserService = userService) {
    super();
  }

  async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email } = req.body;
      const user = await this.userService.createUser(
        firstName,
        lastName,
        email
      );
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUser(req.params.id);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return this.successResponse(res, users);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default UserController;
