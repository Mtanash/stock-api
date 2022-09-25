import express from "express";
import {
  createNewUser,
  deleteUser,
  getUserById,
  loginUser,
} from "./../controllers/user.controller";

const userRouter = express.Router();

export default userRouter;

userRouter.post("/", createNewUser);
userRouter.get("/:userId", getUserById);
userRouter.delete("/:userId", deleteUser);

userRouter.post("/login", loginUser);
