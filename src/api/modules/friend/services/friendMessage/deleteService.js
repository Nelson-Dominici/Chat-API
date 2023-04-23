import Message from '#datebaseSchemas/message.js';
import User from '#datebaseSchemas/user.js';

import { AppError } from '#shared/appError.js';
import { io } from '#shared/servers/httpServer.js';

class DeleteService {
    async delete({ friendNumber, userUuid, msgUuid, userNumber }) {
        const friend = await User.findOne({ number: friendNumber });

        if (!friend) throw new AppError('Something Went Wrong', 404);

        const deletingMsg = await Message.findOneAndUpdate(
            {
                users: { $all: [userUuid, friend.uuid] },
                messages: {
                    $elemMatch: {
                        msgUuid,
                        userNumber,
                    },
                },
            },
            { $pull: { messages: { msgUuid } } },
            { new: true }
        );

        if (!deletingMsg) throw new AppError('Something Went Wrong', 404);

        io.to(friend.uuid).emit('deleteMessage', {
            friendNumber: userNumber,
            msgUuid,
        });
    }
}

export default new DeleteService();
