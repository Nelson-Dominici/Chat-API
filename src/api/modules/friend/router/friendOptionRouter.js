import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { checkTokenReq } from '#middlewares/token/checkTokenReq.js';
import friendOptionController from '../controllers/friendOptionController.js';

const friendOptionRouter = Router();

friendOptionRouter.delete(
    '/unfriendUser/:friendNumber',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            friendNumber: Joi.string().max(9).required(),
        }),
    }),
    checkTokenReq,
    friendOptionController.unfriendUser
);

export default friendOptionRouter;
