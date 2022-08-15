import TaskModel from "../models/task.model";
import { Task } from "../types";

class TaskService {
  constructor(private task: TaskModel = task) {}

  async getTask() {
    const tasks = await this.task.getAllTasks();
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
      asignee: body?.assignee,
      projectId: body.projectId,
    });
    return await task.save();
  }
}

export default TaskService;
