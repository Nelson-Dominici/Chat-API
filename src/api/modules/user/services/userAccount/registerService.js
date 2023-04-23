import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '#shared/appError.js';
import User from '#datebaseSchemas/user.js';

class RegisterService {
    async execute({ name, email, password }) {
        const userEmail = await User.findOne({ email });
        let number = ['', '', '', '', '', '', '', '', ''];

        number = number
            .map((string) => Math.floor(Math.random() * 10))
            .join()
            .replace(/,/g, '');

        if (userEmail) throw new AppError('This Email Already Exists');

        const user = new User({
            name,
            email,
            uuid: uuidv4(),
            number,
            friends: [],
            password: hashSync(password, 10),
        });

        await user.save();
    }
}

export default new RegisterService();
