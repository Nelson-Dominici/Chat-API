import { Router } from "express";

import userAccountRouter from '#modules/user/router/userAccountRouter.js';
import editUserRouter from '#modules/user/router/editUserRouter.js';

import friendOptionRouter from "#modules/friend/router/friendOptionRouter.js";
import friendReqRouter from "#modules/friend/router/friendReqRouter.js";
import friendMsgRouter from "#modules/friend/router/friendMsgRouter.js";

const router = Router();

router.use("/user", userAccountRouter, editUserRouter);
router.use("/friend", friendReqRouter, friendMsgRouter, friendOptionRouter);

export { router };
