import mongoose from 'mongoose';

const schemaUser = mongoose.Schema({
    name: { type: String, tim: true, required: true },
    email: { type: String, tim: true, required: true },
    password: { type: String, tim: true, required: true },
    uuid: { type: String, tim: true, required: true },
    number: { type: String, tim: true, required: true },
});

export default mongoose.model('User', schemaUser);
