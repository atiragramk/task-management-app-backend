import { Schema, Types, model } from "mongoose";
import { TaskPriority, Task, TaskState, Filter, Match } from "../types";
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
  async getAllTasks(query: Filter) {
    const { status, priority, search } = query;
    const match: Match = {};
    if (status) {
      match.statusId = status;
    }
    if (priority) {
      match.priority = priority;
    }
    if (search) {
      match.title = new RegExp(search);
    }

    const aggregate = [];
    if (Object.keys(match).length) {
      aggregate.push({ $match: match });
    }
    aggregate.push({
      $group: {
        _id: "$statusId",
        records: {
          $push: "$$ROOT",
        },
        count: {
          $sum: 1,
        },
      },
    });

    return this.model.aggregate(aggregate);
  }
}

export default TaskModel;
