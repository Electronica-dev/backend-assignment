import { Router } from "express";
import { register, login, message, logout } from "../controllers/userController";
import { verifyToken } from "../middlewares/isAuth";
const userRouter = Router();

userRouter.get("/message", verifyToken, message)
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
