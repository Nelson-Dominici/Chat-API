import jwt from "jsonwebtoken";
import { AppError } from "#shared/appError.js";

class AuthTokenService {

    execute({ token }) {

        try {

            jwt.verify(token, process.env.TOKEN_SECRET);

        } catch {
            throw new AppError("Invalid JWT Token", 401);
        }

    }

}

export default new AuthTokenService();