import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import talkController from "./talkController.js";
import { checkTokenReq } from "#middlewares/token/checkTokenReq.js";

const talkRouter = Router();

talkRouter.post("/sendMessage",
	celebrate({
        [Segments.BODY]: {
            userUuid: Joi.string().uuid().required(),
            friendUuid: Joi.string().uuid().required(),
        }
    }),
    talkController.sendMessage
);

export default talkRouter;