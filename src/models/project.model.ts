import { Schema } from "mongoose";
import ModelMixIn from "../mixIns";
import { Project } from "../types";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

class ProjectModel extends ModelMixIn<Project>("project", projectSchema) {
  getProjectByName(name: string) {
    return this.model.findOne({ name });
  }

  getAllProjects() {
    return this.model.find();
  }

  getProjectById(id: string) {
    return this.model.findById(id);
  }
}

export default ProjectModel;
