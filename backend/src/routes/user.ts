const { Router } = require("express");
const userRouter = Router();

userRouter.get("/login", () => {});
userRouter.get("/logout", () => {});

module.exports = userRouter;
