import { AppError } from "#shared/appError.js"
import jwt from "jsonwebtoken"

export function checkTokenReq(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError("JWT token is missing.")
    }

    try {
        const decodeToken = jwt.verify(authHeader, process.env.TOKEN_SECRET);
        req.uuid = decodeToken.uuid;

        return next();

    } catch {
        throw new AppError("Invalid JWT Token")
    }
}