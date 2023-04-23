import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    users: { type: Array, required: true },
    messages: { type: Array, required: true },
});

export default mongoose.model('messages', messageSchema);
