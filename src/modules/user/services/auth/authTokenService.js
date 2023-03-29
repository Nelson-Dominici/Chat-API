import jwt from "jsonwebtoken";
import { AppError } from "#shared/appError.js"

class AuthTokenService {

    execute(token) {

        try {
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
            return true;

        } catch {
            throw new AppError("Invalid JWT Token", 401);
        }

    }

}

export default new AuthTokenService();