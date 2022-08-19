import TaskModel from "../models/task.model";
import { Filter, Task } from "../types";

class TaskService {
  constructor(private task: TaskModel = task) {}

  async getTask(id: string) {
    return await this.task.getTaskById(id);
  }

  async getTasks(query: Filter) {
    const tasks = await this.task.getAllTasks(query);
    if (!tasks) {
      throw new Error("The tasks do not exist");
    }
    await this.task.model.populate(tasks, {
      path: "statusId",
    });
    return tasks;
  }

  async createTask(body: Partial<Task>) {
    const task = new this.task.model({
      title: body.title,
      description: body?.description,
      statusId: body.statusId,
      priority: body.priority,
      assignee: body?.assignee,
      projectId: body.projectId,
      state: body?.state,
    });
    return await task.save();
  }

  async updateTask(id: string, body: Partial<Task>) {
    const task = await this.getTask(id);
    if (!task) {
      throw new Error("Task does not exist");
    }
    return await this.task.updateTaskById(id, body);
  }

  async deleteTask(id: string) {
    const task = await this.getTask(id);
    if (!task) {
      throw new Error("Task does not exist");
    }
    return await this.task.setStateToDeleted(id);
  }
}

export default TaskService;
