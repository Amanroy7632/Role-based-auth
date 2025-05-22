import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import UserRepositoy from "../repositories/user.repository";
import prisma from "../db/primsa.client";
const router = Router();
const controller = new UserController(
  new UserService(new UserRepositoy(prisma))
);
router.route("/create").post(controller.createUser);
router.route("/:id").patch(controller.updateUser);
router.route("/").get(controller.getUsers);
router.route("/:id").get(controller.getUserById);
router.route("/:id").delete(controller.deleteUser);
export default router;
