import { Types } from "mongoose";

export enum TaskStatus {
  DEFINED = "defined",
  IN_PROGRESS = "in progress",
  BLOCKED = "blocked",
  REVIEW = "review",
  ON_TESTING = "on testing",
  DONE = "done",
  LIVE = "live",
}

export enum TaskState {
  ACTIVE = "active",
  DELETED = "deleted",
}

export enum TaskPriority {
  LOW = "low",
  NORMAL = "normal",
  HIGH = "high",
  CRITICAL = "critical",
}

export type User = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
};

export type Task = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  statusId: string;
  priority: TaskPriority;
  assignee?: Types.ObjectId;
  projectId: Types.ObjectId;
};

export type Project = {
  _id: Types.ObjectId;
  name: string;
  shortName: string;
  description: string;
};

export type Status = {
  _id: Types.ObjectId;
  displayName: string;
  key: string;
};

export type Filter = {
  status?: string;
  priority?: string;
  search?: string;
};

export type Match = {
  title?: RegExp;
  statusId?: string;
  priority?: string;
};
