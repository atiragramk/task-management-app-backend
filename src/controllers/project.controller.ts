import ProjectService from "../services/project.service";
import { BasicController } from "./basic.controller";
import { Request, Response } from "express";

class ProjectController extends BasicController {
  constructor(private projectService: ProjectService = projectService) {
    super();
  }

  async createProject(req: Request, res: Response) {
    try {
      const project = await this.projectService.createProject(
        req.body.name,
        req.body.description
      );
      return this.successResponse(res, project);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await this.projectService.getAllProjects();
      return this.successResponse(res, projects);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getProject(req: Request, res: Response) {
    try {
      const project = await this.projectService.getProject(req.params.id);
      return this.successResponse(res, project);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default ProjectController;
