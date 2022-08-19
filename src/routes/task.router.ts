import express from "express";
import TaskController from "../controllers/task.controller";
import TaskModel from "../models/task.model";
import TaskService from "../services/task.service";

const router = express.Router();
const taskController = new TaskController(new TaskService(new TaskModel()));

router.post("/", taskController.createTask.bind(taskController));
router.get("/", taskController.getAllTasks.bind(taskController));
router.get("/:id", taskController.getTask.bind(taskController));
router.patch("/:id", taskController.updateTask.bind(taskController));
router.delete("/:id", taskController.deleteTask.bind(taskController));

export default router;
