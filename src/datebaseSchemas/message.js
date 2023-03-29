import mongoose from "mongoose";

const messageSchema = mongoose.Schema({

	users: {type: Array, tim: true, required: true },
	messages: {type: Array, tim: true, required: true },

})

export default mongoose.model("messages", messageSchema);