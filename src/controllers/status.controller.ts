import { BasicController } from "./basic.controller";
import { Request, Response } from "express";

import StatusService from "../services/status.service";
import * as yup from "yup";

class StatusController extends BasicController {
  constructor(private statusService: StatusService = statusService) {
    super();
  }

  async createStatus(req: Request, res: Response) {
    try {
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
