import express from "express";
import statusRouter from "./status.router";
import projectRouter from "./project.router";
import userRouter from "./user.router";
import taskRouter from "./task.router";

const router = express.Router();

router.use("/statuses", statusRouter);
router.use("/projects", projectRouter);
router.use("/users", userRouter);
router.use("/tasks", taskRouter);

export default router;
