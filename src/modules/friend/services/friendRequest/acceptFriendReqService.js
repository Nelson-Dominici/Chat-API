import User from "#datebaseSchemas/user.js"
import Message from "#datebaseSchemas/message.js"
import FriendRequest from "#datebaseSchemas/friendRequest.js"
import { AppError } from "#shared/appError.js";
 
class acceptFriendReqService {

	async accept({userUuid, requesterNumber}){

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

    	const message = new Message({
    		users: [userUuid, requester.uuid],
    		messages: []
    	})

    	message.save();

    	return {
    		name: requester.name,
    		bio: requester.bio
    	}
	}

}

export default new acceptFriendReqService(); 