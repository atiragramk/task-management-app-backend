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
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  color: string;
  token?: string;
};

export type Task = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  statusId: string;
  priority: TaskPriority;
  assignee?: Types.ObjectId;
  projectId: Types.ObjectId;
  state?: string;
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
  assignee?: string[];
  projectId?: string;
};

export type Match = {
  state?: string;
  title?: RegExp;
  statusId?: string;
  priority?: string;
  projectId?: string;
  assignee?: {
    $elemMatch: {
      email: {
        $in: string[];
      };
    };
  };
};

export type UserInput = {
  email: string;
  password: string;
};

export type Context = {
  token?: string;
  user?: User;
};
