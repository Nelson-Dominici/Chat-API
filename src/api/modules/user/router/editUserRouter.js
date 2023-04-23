import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { checkTokenReq } from '#middlewares/token/checkTokenReq.js';
import editUserController from '../controllers/editUserController.js';

const editUserRouter = Router();

editUserRouter.patch(
    '/rename',
    celebrate({
        [Segments.BODY]: {
            newName: Joi.string().required(),
        },
    }),
    checkTokenReq,
    editUserController.rename
);

export default editUserRouter;
