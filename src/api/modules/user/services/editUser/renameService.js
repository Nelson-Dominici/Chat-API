import { AppError } from '#shared/appError.js';
import { io } from '#shared/servers/httpServer.js';

import User from '#datebaseSchemas/user.js';
import Message from '#datebaseSchemas/message.js';

class RenameService {
    async execute({ userUuid, newName }) {
        const user = await User.findOneAndUpdate(
            { uuid: userUuid },
            { name: newName }
        );

        if (!user) throw new AppError('Something Went Wrong', 404);

        const friends = await Message.find({
            users: { $all: [userUuid] },
        });

        if (friends.length !== 0) {
            const friendsUuid = friends
                .map((doc) =>
                    doc.users
                        .filter((userDocUuid) => userDocUuid !== userUuid)
                        .map((userDocUuid) => userDocUuid)
                )
                .flat();

            friendsUuid.forEach((roomName) => {
                io.to(roomName).emit('friendNewName', {
                    friendNumber: user.number,
                    name: user.name,
                });
            });
        }
    }
}

export default new RenameService();
