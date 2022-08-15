import { BasicController } from "./basic.controller";
import { Request, Response } from "express";

import * as yup from "yup";
import { Task, Filter } from "../types";
import TaskService from "../services/task.service";

class TaskController extends BasicController {
  constructor(private taskService: TaskService = taskService) {
    super();
  }
  async createTask(req: Request, res: Response) {
    try {
      const task = await this.taskService.createTask(req.body);
      return this.successResponse(res, task);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const { query } = req;
      const tasks = await this.taskService.getTask(query);
      return this.successResponse(res, tasks);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default TaskController;
