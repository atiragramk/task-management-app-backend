import { BasicController } from "./basic.controller";
import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { createUserSchema } from "../validation";

class UserController extends BasicController {
  createUserSchema: typeof createUserSchema;
  constructor(private authService: AuthService = authService) {
    super();
    this.createUserSchema = createUserSchema;
  }

  async createUser(req: Request, res: Response) {
    try {
      await this.createUserSchema.validate(req.body);
      const user = await this.authService.registerUser(req.body);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.authService.getUser(req.params.id);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.authService.getAllUsers();
      return this.successResponse(res, users);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      // await this.createUserSchema.validate(req.body);
      const token = await this.authService.loginUser(req.body);
      return this.successResponse(res, token);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      const user = await this.authService.getUserByEmail(req.body.email);
      const response = this.authService.logoutUser(user!);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default UserController;
