// combining all routes

import { Router } from "express";
import healthRouter from "./health.js";
import templateRouter from "./template.js";
import chatRouter from "./chat.js";
import signupRouter from "./signup.js";
import loginRouter from "./login.js";

const router = Router();

router.use("/", healthRouter);
router.use("/template", templateRouter);
router.use("/chat", chatRouter);
router.use("/signup", signupRouter);
router.use("/login", loginRouter);

export default router;
