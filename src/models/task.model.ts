import { Schema, Types, model } from "mongoose";
import { TaskPriority, Task, TaskState } from "../types";
import ModelMixIn from "../mixIns";

export const taskSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    key: { type: Number, default: 1, index: true },
    description: { type: String },
    statusId: {
      type: String,
      ref: "status",
      index: true,
    },
    priority: {
      type: String,
      enum: [
        TaskPriority.LOW,
        TaskPriority.NORMAL,
        TaskPriority.HIGH,
        TaskPriority.CRITICAL,
      ],
      required: true,
      index: true,
    },
    projectId: {
      type: Types.ObjectId,
      index: true,
      required: true,
    },
    asignee: { type: Types.ObjectId },
    state: {
      type: String,
      enum: [TaskState.ACTIVE, TaskState.DELETED],
      default: TaskState.ACTIVE,
    },
  },
  { timestamps: true }
);

taskSchema.pre("save", function (next) {
  let modal;
  if (this.isNew) {
    if (!modal) {
      modal = model("task");
    }
    modal.find({}).then((entries) => {
      this.key = entries.length + 1;
      next();
    });
  }
});

class TaskModel extends ModelMixIn<Task>("task", taskSchema) {
  getTasksByStatus(status: string) {
    return this.model.find({ status });
  }
  async getAllTasks() {
    return this.model.aggregate([
      {
        $group: {
          _id: "$statusId",
          records: {
            $push: "$$ROOT",
          },
        },
      },
    ]);
    // return this.model
    //   .find()
    //   .populate({ path: "statusId", select: "displayName" });
  }
}

export default TaskModel;
