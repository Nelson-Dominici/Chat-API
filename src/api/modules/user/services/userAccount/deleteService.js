import FriendRequest from '#datebaseSchemas/friendRequest.js';
import Message from '#datebaseSchemas/message.js';
import User from '#datebaseSchemas/user.js';

import { AppError } from '#shared/appError.js';
import { io } from '#shared/servers/httpServer.js';

class DeleteService {
    async delete(userUuid) {
        const user = await User.findOneAndDelete({ uuid: userUuid });

        if (!user) throw new AppError('Something Went Wrong', 404);

        const friends = await Message.find({
            users: { $all: [userUuid] },
        });

        await FriendRequest.deleteMany({
            $or: [{ user: userUuid }, { receiver: userUuid }],
        });

        if (friends.length !== 0) {
            await Message.deleteMany({
                users: { $all: [userUuid] },
            });

            const friendsUuid = friends
                .map((doc) =>
                    doc.users
                        .filter((userDocUuid) => userDocUuid !== userUuid)
                        .map((userDocUuid) => userDocUuid)
                )
                .flat();

            friendsUuid.forEach((roomName) => {
                io.to(roomName).emit('friendAccountDeleted', {
                    friendNumber: user.number,
                    name: user.name,
                });
            });
        }
    }
}

export default new DeleteService();
