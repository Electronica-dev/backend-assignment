import { Router } from "express";
import { getAccountBalance } from "../controllers/ethController";

const ethRouter = Router();

ethRouter.post("/getBalance", getAccountBalance);

export default ethRouter;