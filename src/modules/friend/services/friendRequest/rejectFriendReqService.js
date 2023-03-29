import FriendRequest from "#datebaseSchemas/friendRequest.js"
import User from "#datebaseSchemas/user.js"
import { AppError } from "#shared/appError.js";

class RejectFriendReqService {

	async reject({userUuid, requesterNumber}){

		const user = await User.findOne({uuid: userUuid});
        const requester = await User.findOne({number: requesterNumber});
		
      	if(!user || !requester)	
    		throw new AppError("Something went wrong", 404);

    	const deletingFriendReq = await FriendRequest.findOneAndDelete({
    		
    		user: requester.uuid,
    		receiver: userUuid

    	});

    	if(!deletingFriendReq)
    		throw new AppError("Something went wrong", 404);

	}

}

export default new RejectFriendReqService(); 