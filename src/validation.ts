import * as yup from "yup";
import { TaskPriority } from "./types";

const assigneeTaskSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string(),
  _id: yup.string(),
  updatedAt: yup.string(),
  createdAt: yup.string(),
  __v: yup.number(),
});

export const createTaskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  statusId: yup.string().required(),
  priority: yup
    .mixed<TaskPriority>()
    .oneOf(Object.values(TaskPriority))
    .required(),
  projectId: yup.string(),
  assignee: yup.array().of(assigneeTaskSchema),
});

export const updateTaskSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  statusId: yup.string(),
  priority: yup.mixed<TaskPriority>().oneOf(Object.values(TaskPriority)),
  projectId: yup.string(),
  assignee: yup.array().of(assigneeTaskSchema),
});

export const createStatusSchema = yup.object().shape({
  key: yup.string().required(),
});

export const createUserSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  color: yup.string().required(),
});
