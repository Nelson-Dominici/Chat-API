import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import friendController from "./friendController.js";
import { checkTokenReq } from "#middlewares/token/checkTokenReq.js";

const friendRouter = Router();

friendRouter.post("/sendFriendRequest",
	celebrate({
        [Segments.BODY]: {
            receiverNumber: Joi.string().max(9).required(),
        }
    }),
    checkTokenReq,
    friendController.sendFriendReq
);

friendRouter.post("/acceptFriendRequest",
    celebrate({
        [Segments.BODY]: {
            requesterNumber: Joi.string().required(),
        }
    }),
    checkTokenReq,
    friendController.acceptFriendReq
);

friendRouter.post("/rejectFriendRequest",
    celebrate({
        [Segments.BODY]: {
            requesterNumber: Joi.string().required(),
        }
    }),
    checkTokenReq,
    friendController.rejectFriendReq
);

export default friendRouter;