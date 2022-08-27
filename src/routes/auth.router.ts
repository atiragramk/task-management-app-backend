import express from "express";
import UserModel from "../models/user.model";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";
import isAuthMiddleware from "../middlewares/isAuth.middleware";

const router = express.Router();
const userController = new AuthController(new AuthService(new UserModel()));

router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUser.bind(userController));

router.post("/register", userController.createUser.bind(userController));
router.post("/login", userController.loginUser.bind(userController));
router.post(
  "/logout",
  isAuthMiddleware,
  userController.logoutUser.bind(userController)
);

export default router;
