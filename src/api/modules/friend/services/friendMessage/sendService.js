import { v4 as uuidv4 } from 'uuid';
import Message from '#datebaseSchemas/message.js';
import User from '#datebaseSchemas/user.js';
import { AppError } from '#shared/appError.js';

import { io } from '#shared/servers/httpServer.js';

class SendService {
    async send({ userUuid, friendNumber, message, userNumber }) {
        const friend = await User.findOne({ number: friendNumber });

        if (friendNumber === userNumber || !friend)
            throw new AppError('Something went wrong', 404);

        const msgUuid = uuidv4();

        const sendingMessage = await Message.updateOne(
            {
                users: { $all: [friend.uuid, userUuid] },
            },
            {
                $push: {
                    messages: {
                        msgUuid,
                        userNumber,
                        message,
                    },
                },
            }
        );

        if (sendingMessage.modifiedCount !== 1)
            throw new AppError('Something Went Wrong', 404);

        io.to(friend.uuid).emit('friendMessage', {
            friendNumber: userNumber,
            msgUuid,
            message,
        });
    }
}

export default new SendService();
