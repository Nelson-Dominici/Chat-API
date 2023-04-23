import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { checkTokenReq } from '#middlewares/token/checkTokenReq.js';
import friendMsgController from '../controllers/friendMsgController.js';

const friendMsgRouter = Router();

friendMsgRouter.post(
    '/sendMessage',
    celebrate({
        [Segments.BODY]: {
            friendNumber: Joi.string().required(),
            message: Joi.string().required(),
        },
    }),
    checkTokenReq,
    friendMsgController.sendMessage
);

friendMsgRouter.delete(
    '/:friendNumber/deleteMessage/:msgUuid',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            msgUuid: Joi.string().uuid().required(),
            friendNumber: Joi.string().max(9).required(),
        }),
    }),
    checkTokenReq,
    friendMsgController.deleteMessage
);

friendMsgRouter.get(
    '/getMessages/:friendNumber',
    checkTokenReq,
    friendMsgController.getMessage
);

export default friendMsgRouter;
