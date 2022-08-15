import express from "express";
import ProjectController from "../controllers/project.controller";
import ProjectModel from "../models/project.model";
import ProjectService from "../services/project.service";

const router = express.Router();
const projectController = new ProjectController(
  new ProjectService(new ProjectModel())
);

router.post("/", projectController.createProject.bind(projectController));
router.get("/", projectController.getAllProjects.bind(projectController));
router.get("/:id", projectController.getProject.bind(projectController));

export default router;
