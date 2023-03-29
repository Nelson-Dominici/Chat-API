import FriendRequest from "#datebaseSchemas/friendRequest.js"
import { AppError } from "#shared/appError.js";
import User from "#datebaseSchemas/user.js"
import Message from "#datebaseSchemas/message.js"

class SendFriendReqService {

	async send({userUuid, receiverNumber}){

        const user = await User.findOne({uuid: userUuid});
        const receiver = await User.findOne({number: receiverNumber});

        if(!user || !receiver || user.number === receiverNumber)	
        	throw new AppError("Something went wrong, check that the number is correct.", 404);

        const alreadyFriends = await Message.findOne(
            { users: { $all: [userUuid, receiver.uuid] }}
        );

        if(alreadyFriends)
            throw new AppError("You and this user are already friends.");

        const friendRequestExists = await FriendRequest.findOne(

            { $or: [
                { 
                    user: user.uuid,
                    receiver: receiver.uuid

                },{ 
                    user: receiver.uuid,
                    receiver: user.uuid
                } 
            ] }

        );

        if(friendRequestExists)
            throw new AppError("You may have sent or received a friend request from this number. Please check your pending friend requests to confirm.");
      
        const friendRequest = new FriendRequest({

            user: user.uuid,
            receiver: receiver.uuid
        })

        friendRequest.save();

        return true;

	}

}

export default new SendFriendReqService();