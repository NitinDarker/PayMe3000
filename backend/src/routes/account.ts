import { Router } from "express";
import { getBalance, transferMoney, getHistory } from "../controllers/account/index.js";
import userAuth from "../middlewares/auth.js";

const accountRouter = Router();

accountRouter.get("/balance", userAuth, getBalance);
accountRouter.post("/transfer", userAuth, transferMoney);
accountRouter.get("/history", userAuth, getHistory);

export default accountRouter;
