import { BasicController } from "./basic.controller";
import { Request, Response } from "express";

import StatusService from "../services/status.service";
import { createStatusSchema } from "../validation";

class StatusController extends BasicController {
  createStatusSchema: typeof createStatusSchema;
  constructor(private statusService: StatusService = statusService) {
    super();
    this.createStatusSchema = createStatusSchema;
  }

  async createStatus(req: Request, res: Response) {
    try {
      await this.createStatusSchema.validate(req.body);
      const status = await this.statusService.createStatus(req.body.key);
      return this.successResponse(res, status);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getAllStatuses(req: Request, res: Response) {
    try {
      const status = await this.statusService.getAllStatuses();
      return this.successResponse(res, status);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default StatusController;
