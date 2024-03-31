import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDoc = YAML.load("./swagger.yml");
const docsRouter = Router();

docsRouter.use("/", serve, setup(swaggerDoc))

export default docsRouter;