import Message from '#datebaseSchemas/message.js';
import User from '#datebaseSchemas/user.js';

import { AppError } from '#shared/appError.js';

class GetMsgsService {
    async get({ skipQuery, friendNumber, userUuid }) {
        const friend = await User.findOne({ number: friendNumber });

        if (!friend) throw new AppError('Something Went Wrong', 404);

        const skip = !Number(skipQuery) ? 1 : Number(skipQuery);

        const messages = await Message.aggregate([
            { $match: { users: { $all: [friend.uuid, userUuid] } } },
            { $project: { messages: { $slice: ['$messages', -skip] } } },
        ]);

        if (messages.length === 0)
            throw new AppError('Something Went Wrong', 404);

        return messages[0].messages.slice(0).reverse();
    }
}

export default new GetMsgsService();
