import { Request, Response } from "express";

import { BasicController } from "./basic.controller";
import TaskService from "../services/task.service";
import { createTaskSchema, updateTaskSchema } from "../validation";

class TaskController extends BasicController {
  createTaskSchema: typeof createTaskSchema;
  updateTaskSchema: typeof updateTaskSchema;
  constructor(private taskService: TaskService = taskService) {
    super();
    this.createTaskSchema = createTaskSchema;
    this.updateTaskSchema = updateTaskSchema;
  }

  async createTask(req: Request, res: Response) {
    try {
      await this.createTaskSchema.validate(req.body);
      const task = await this.taskService.createTask(req.body);
      return this.successResponse(res, task);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const { query } = req;
      const tasks = await this.taskService.getTasks(query);
      return this.successResponse(res, tasks);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getTask(req: Request, res: Response) {
    try {
      const task = await this.taskService.getTask(req.params.id);
      return this.successResponse(res, task);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      await this.updateTaskSchema.validate(req.body);
      const task = await this.taskService.updateTask(req.params.id, req.body);
      return this.successResponse(res, task);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const task = await this.taskService.deleteTask(req.params.id);
      return this.successResponse(res, task);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default TaskController;
