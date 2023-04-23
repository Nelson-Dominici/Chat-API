import FriendRequest from '#datebaseSchemas/friendRequest.js';
import { AppError } from '#shared/appError.js';
import User from '#datebaseSchemas/user.js';
import Message from '#datebaseSchemas/message.js';

import { io } from '#shared/servers/httpServer.js';

class SendService {
    async send({ userUuid, receiverNumber }) {
        const user = await User.findOne({ uuid: userUuid });
        const receiver = await User.findOne({ number: receiverNumber });

        if (!user || !receiver || user.number === receiverNumber)
            throw new AppError(
                'Something Went Wrong, Check That the Number Is Correct',
                404
            );

        const alreadyFriends = await Message.findOne({
            users: { $all: [receiver.uuid, userUuid] },
        });

        if (alreadyFriends)
            throw new AppError('You And This User Are Already Friends');

        const friendRequestExists = await FriendRequest.findOne({
            $or: [
                {
                    user: user.uuid,
                    receiver: receiver.uuid,
                },
                {
                    user: receiver.uuid,
                    receiver: user.uuid,
                },
            ],
        });

        if (friendRequestExists)
            throw new AppError(
                'You May Have Sent Or Received A Friend Request From This Number. Please Check Your Pending Friend Requests To Confirm'
            );

        const friendRequest = new FriendRequest({
            user: user.uuid,
            receiver: receiver.uuid,
        });

        io.to(receiver.uuid).emit('requestFriend', {
            friendNumber: user.number,
            name: user.name,
        });

        friendRequest.save();
    }
}

export default new SendService();
