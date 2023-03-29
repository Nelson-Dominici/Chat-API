import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import userAccountController from "./userController.js";

const userRoute = Router();

userRoute.post("/",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    userAccountController.login
);

userRoute.post("/register",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }
    }),
    userAccountController.register
);

userRoute.post("/authToken", 
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().required(),
        }
    }),

    userAccountController.authToken
);

export default userRoute;