import { Schema } from "mongoose";
import { Filter, Match, Status } from "../types";
import ModelMixIn from "../mixIns";

const statusSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    displayName: { type: String },
    projectId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

// statusSchema.index({ key: 1 });

class StatusModel extends ModelMixIn<Status>("status", statusSchema) {
  getStatusByKeyAndProjectId(key: string, projectId: string) {
    return this.model.findOne({ key, projectId });
  }
  getAllStatuses(query: Filter) {
    const { projectId } = query;
    const match: Match = {};
    if (projectId) {
      match.projectId = projectId;
    }

    const aggregate = [];
    if (Object.keys(match).length) {
      aggregate.push({ $match: match });
    }

    return this.model.aggregate(aggregate);
  }

  deleteStatusById(id: string) {
    if (!id) {
      throw new Error("ID is required");
    }
    return this.model.findByIdAndDelete(id);
  }
}

export default StatusModel;
