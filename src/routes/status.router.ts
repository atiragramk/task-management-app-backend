import express from "express";
import StatusModel from "../models/status.model";
import StatusService from "../services/status.service";
import StatusController from "../controllers/status.controller";

const statusController = new StatusController(
  new StatusService(new StatusModel())
);

const router = express.Router();

router.post("/", statusController.createStatus.bind(statusController));
router.get("/", statusController.getAllStatuses.bind(statusController));
router.delete("/:id", statusController.deleteStatus.bind(statusController));

export default router;
