import User from '#datebaseSchemas/user.js';
import Message from '#datebaseSchemas/message.js';
import FriendRequest from '#datebaseSchemas/friendRequest.js';

import { AppError } from '#shared/appError.js';
import { io } from '#shared/servers/httpServer.js';

class AcceptService {
    async accept({ userUuid, requesterNumber }) {
        const requester = await User.findOne({ number: requesterNumber });
        const user = await User.findOne({ uuid: userUuid });

        if (!requester || !user)
            throw new AppError('Something Went Wrong', 404);

        const deletingFriendReq = await FriendRequest.findOneAndDelete({
            user: requester.uuid,
            receiver: userUuid,
        });

        if (!deletingFriendReq)
            throw new AppError('Friend Request Does Not Exist', 404);

        const message = new Message({
            users: [userUuid, requester.uuid],
            messages: [],
        });

        io.to(requester.uuid).emit('friendReqAccepted', {
            friendNumber: user.number,
            name: user.name,
        });

        message.save();

        return {
            name: requester.name,
            number: requester.number,
        };
    }
}

export default new AcceptService();
