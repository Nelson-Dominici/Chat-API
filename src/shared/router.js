import { Router } from "express";
const router = Router();

import friendRouter from "#modules/friend/friendRouter.js";
import usertRouter from "#modules/user/userRouter.js";
import talkRouter from "#modules/talk/talkRouter.js";

router.use("/user", usertRouter);
router.use("/user/talk", talkRouter);
router.use("/user/friend", friendRouter);

export { router };