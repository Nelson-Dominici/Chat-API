import jwt from 'jsonwebtoken';

import { compareSync } from 'bcrypt';
import User from '#datebaseSchemas/user.js';
import Message from '#datebaseSchemas/message.js';

import { AppError } from '#shared/appError.js';

class LoginService {
    async execute({ email, password }) {
        const user = await User.findOne({ email });

        if (!user) throw new AppError('Password Or Email Are Incorrect');

        if (!compareSync(password, user.password))
            throw new AppError('Password Or Email Are Incorrect');

        const token = jwt.sign(
            {
                number: user.number,
                uuid: user.uuid,
            },
            process.env.TOKEN_SECRET
        );

        let friends = await Message.find({
            users: { $all: [user.uuid] },
        });

        if (friends.length !== 0) {
            const friendsUuid = friends
                .map((doc) =>
                    doc.users
                        .filter((userDocUuid) => userDocUuid !== user.uuid)
                        .map((userDocUuid) => userDocUuid)
                )
                .flat();

            friends = await User.find(
                { uuid: { $in: friendsUuid } },
                { name: 1, number: 1, _id: 0 }
            );
        }

        return {
            token,
            friends,
        };
    }
}

export default new LoginService();
