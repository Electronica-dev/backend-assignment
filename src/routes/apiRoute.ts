import { Router } from "express";
import { queryPublicAPI } from "../controllers/apiController";

const apiRouter = Router();

apiRouter.use("/queryPublicApi", queryPublicAPI)

export default apiRouter