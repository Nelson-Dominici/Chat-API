import { AppError } from "#shared/appError.js";
import User from "#datebaseSchemas/user.js"
import { hashSync } from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

class RegisterService {


    async execute({ name, email, password }) {

        const userEmail = await User.findOne({ email });
        let number = ["","","","","","","","",""];

        number = number.map((string) => {

            return Math.floor(Math.random() * 10);

        }).join().replace(/,/g, "");

        if (userEmail)
            throw new AppError("This email already exists");

        const user = new User({
            name,
            email,
            bio: "",
            uuid: uuidv4(),
            number,
            password: hashSync(password, 10),
        });

        await user.save();

    }
}

export default new RegisterService();