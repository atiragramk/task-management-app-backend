import express from "express";
import UserModel from "../models/user.model";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = new UserController(new UserService(new UserModel()));

router.post("/", userController.createUser.bind(userController));
router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUser.bind(userController));

export default router;
