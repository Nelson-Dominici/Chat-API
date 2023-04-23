import FriendRequest from '#datebaseSchemas/friendRequest.js';
import User from '#datebaseSchemas/user.js';
import { AppError } from '#shared/appError.js';

class RejectService {
    async reject({ userUuid, requesterNumber }) {
        const requester = await User.findOne({ number: requesterNumber });

        if (!requester) throw new AppError('Something Went Wrong', 404);

        const deletingFriendReq = await FriendRequest.findOneAndDelete({
            user: requester.uuid,
            receiver: userUuid,
        });

        if (!deletingFriendReq)
            throw new AppError('Friend Request Does Not Exist', 404);
    }
}

export default new RejectService();
