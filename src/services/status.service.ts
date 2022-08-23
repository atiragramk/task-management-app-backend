import StatusModel from "../models/status.model";

class StatusService {
  constructor(private status: StatusModel = status) {}

  async createStatus(key: string) {
    const existStatus = await this.status.getStatusByKey(
      key.toLowerCase().trim()
    );
    if (existStatus) {
      throw new Error("This status is already exist");
    }
    const displayName = key.charAt(0).toUpperCase() + key.slice(1);
    const status = new this.status.model({ key, displayName });
    return await status.save();
  }

  async getAllStatuses() {
    return await this.status.getAllStatuses();
  }

  async deleteStatus(id: string) {
    return await this.status.deleteStatusById(id);
  }
}

export default StatusService;
