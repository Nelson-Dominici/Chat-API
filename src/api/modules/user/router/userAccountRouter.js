import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { checkTokenReq } from '#middlewares/token/checkTokenReq.js';
import userAccountController from '../controllers/userAccountController.js';

const userAccountRouter = Router();

userAccountRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    userAccountController.login
);

userAccountRouter.post(
    '/register',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
    userAccountController.register
);

userAccountRouter.delete(
    '/deleteAccount',
    checkTokenReq,
    userAccountController.deleteAccount
);

userAccountRouter.post(
    '/authToken',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().required(),
        },
    }),

    userAccountController.authToken
);

export default userAccountRouter;
