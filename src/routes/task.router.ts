import express from "express";
import TaskController from "../controllers/task.controller";
import TaskModel from "../models/task.model";
import TaskService from "../services/task.service";

const router = express.Router();
const taskController = new TaskController(new TaskService(new TaskModel()));

router.post("/", taskController.createTask.bind(taskController));
router.get("/", taskController.getAllTasks.bind(taskController));

export default router;
