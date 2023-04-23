import { AppError } from "#shared/appError.js";
import jwt from "jsonwebtoken";
 
export function checkTokenReq(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token error");
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2){
        throw new AppError("JWT token error");
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        throw new AppError("JWT token error");
    }

    try {
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.uuid = decodeToken.uuid;
        req.number = decodeToken.number;

        return next();

    } catch {
        throw new AppError("JWT token error", 401);
    }
}