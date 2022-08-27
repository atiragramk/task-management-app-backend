import express from "express";
import statusRouter from "./status.router";
import projectRouter from "./project.router";
import authRouter from "./auth.router";
import taskRouter from "./task.router";
import isAuthMiddleware from "../middlewares/isAuth.middleware";

const router = express.Router();

router.use("/statuses", isAuthMiddleware, statusRouter);
router.use("/projects", isAuthMiddleware, projectRouter);
router.use("/auth", authRouter);
router.use("/tasks", isAuthMiddleware, taskRouter);

export default router;
