import StatusModel from "../models/status.model";
import { Filter } from "../types";

class StatusService {
  constructor(private status: StatusModel = status) {}

  async createStatus(key: string, projectId: string) {
    const existStatus = await this.status.getStatusByKeyAndProjectId(
      key.toLowerCase().trim(),
      projectId
    );
    if (existStatus) {
      throw new Error("This status is already exist");
    }
    const displayName = key.charAt(0).toUpperCase() + key.slice(1);
    const status = new this.status.model({ key, displayName, projectId });
    return await status.save();
  }

  async getAllStatuses(query: Filter) {
    return await this.status.getAllStatuses(query);
  }

  async deleteStatus(id: string) {
    return await this.status.deleteStatusById(id);
  }
}

export default StatusService;
