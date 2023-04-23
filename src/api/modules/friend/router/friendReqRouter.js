import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { checkTokenReq } from '#middlewares/token/checkTokenReq.js';
import friendReqController from '../controllers/friendReqController.js';

const friendRouter = Router();

friendRouter.post(
    '/sendFriendRequest',
    celebrate({
        [Segments.BODY]: {
            receiverNumber: Joi.string().max(9).required(),
        },
    }),
    checkTokenReq,
    friendReqController.sendFriendReq
);

friendRouter.post(
    '/acceptFriendRequest',
    celebrate({
        [Segments.BODY]: {
            requesterNumber: Joi.string().max(9).required(),
        },
    }),
    checkTokenReq,
    friendReqController.acceptFriendReq
);

friendRouter.delete(
    '/rejectFriendRequest/:requesterNumber',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            requesterNumber: Joi.string().max(9).required(),
        }),
    }),
    checkTokenReq,
    friendReqController.rejectFriendReq
);

export default friendRouter;
