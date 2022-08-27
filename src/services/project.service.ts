import ProjectModel from "../models/project.model";

class ProjectService {
  constructor(private project: ProjectModel = project) {}

  async createProject(name: string, description: string) {
    const existProject = await this.project.getProjectByName(
      name.toUpperCase().trim()
    );
    if (existProject) {
      throw new Error("The project with the same name is already exist");
    }
    const arr = name.split(" ");
    let shortName;
    if (arr.length === 1) {
      shortName = arr[0].slice(0, 2).toUpperCase();
    } else {
      shortName =
        arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
    }
    const project = new this.project.model({
      name: name.toUpperCase(),
      shortName,
      description,
    });
    return await project.save();
  }

  async getAllProjects() {
    return await this.project.getAllProjects();
  }

  async getProject(id: string) {
    return await this.project.getProjectById(id);
  }
}

export default ProjectService;
