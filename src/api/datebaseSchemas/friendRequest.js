import mongoose from 'mongoose';

const schemaFriendRequest = mongoose.Schema({
    user: { type: String, tim: true, required: true },
    receiver: { type: String, tim: true, required: true },
});

export default mongoose.model('friendRequest', schemaFriendRequest);
