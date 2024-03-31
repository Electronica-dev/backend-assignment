const dotenv = require("dotenv");
const cors = require("cors");
import Express from "express";
import { connectDb } from "./config/database";
import userRouter from "./routes/userRoute";
import docsRouter from "./routes/docsRoute";
import ethRouter from "./routes/ethRoute";
import apiRouter from "./routes/apiRoute";

dotenv.config();

const app = Express();
const PORT = process.env.PORT ?? 3000;

connectDb();

app.use(cors());

app.use(Express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/web3", ethRouter);

app.use("/api-docs", docsRouter);

app.use("/api/v1/public", apiRouter);

app.get("/", (req, res) => {
  res.send("Yo");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
