import { Response } from "express";

export const formatResponse = (error: boolean, data: any) => {
  return {
    error,
    data,
  };
};

export const formatSuccessResponse = (res: Response, data: any) => {
  return res.status(200).json(formatResponse(false, data));
};

export const formatErrorResponse = (
  res: Response,
  error: any,
  status: number = 400
) => {
  return res.status(status).json(formatResponse(true, error));
};
