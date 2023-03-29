import User from "#datebaseSchemas/user.js"
import jwt from "jsonwebtoken";
import { AppError } from "#shared/appError.js";
import { compareSync } from "bcrypt"

class LoginService {

    async execute({ email, password }) {
        const user = await User.findOne({ email });

        if (!user)
            throw new AppError("password or email are incorrect");

        if (!compareSync(password, user.password))
            throw new AppError("password or email are incorrect");

        const token = jwt.sign({
            number: user.number,
            uuid: user.uuid,

        }, process.env.TOKEN_SECRET)

        return {token};

    }
}

export default new LoginService();