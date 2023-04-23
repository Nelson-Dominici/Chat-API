import Message from '#datebaseSchemas/message.js';
import User from '#datebaseSchemas/user.js';
import { AppError } from '#shared/appError.js';

import { io } from '#shared/servers/httpServer.js';

class UnfriendService {
    async execute({ friendNumber, userUuid }) {
        const friend = await User.findOne({ number: friendNumber });
        const user = await User.findOne({ uuid: userUuid });

        if (!friend || !user) throw new AppError('Something Went Wrong', 404);

        const isFriend = await Message.findOneAndDelete({
            users: { $all: [friend.uuid, userUuid] },
        });

        if (!isFriend) throw new AppError('Something Went Wrong', 404);

        io.to(friend.uuid).emit('brokenFriendship', {
            friendNumber: user.number,
            name: user.name,
        });
    }
}

export default new UnfriendService();
