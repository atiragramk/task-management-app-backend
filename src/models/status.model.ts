import { Schema } from "mongoose";
import { Status } from "../types";
import ModelMixIn from "../mixIns";

const statusSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    displayName: { type: String },
  },
  { timestamps: true }
);

statusSchema.index({ key: 1 });

class StatusModel extends ModelMixIn<Status>("status", statusSchema) {
  getStatusByKey(key: string) {
    return this.model.findOne({ key });
  }
  getAllStatuses() {
    return this.model.find();
  }
}

export default StatusModel;
