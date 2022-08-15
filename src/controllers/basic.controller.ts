import {
  formatErrorResponse,
  formatSuccessResponse,
} from "../services/http.service";
import { Response } from "express";

export class BasicController {
  successResponse(res: Response, data: any) {
    return formatSuccessResponse(res, data);
  }
  errorResponse(res: Response, error: any, status = 400) {
    return formatErrorResponse(res, error.message, status);
  }
}
