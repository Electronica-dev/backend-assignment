import { Router } from "express";
import { getAccountBalance } from "../controllers/ethController";

const ethRouter = Router();

ethRouter.get("/getBalance", getAccountBalance);

export default ethRouter;