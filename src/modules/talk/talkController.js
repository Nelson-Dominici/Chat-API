import { SendMessageService } from "./services/message/sendMessageService.js";

class TalkController {

	async sendMessage(req, res){

		const { userUuid } = req.body;

		const sendMessageService = new SendMessageService();

		await sendMessageService.send({
			userUuid,
		});

		return res.status(200).json({
			status: "success",
			data: "enviando"
		});
	}

}

export default new TalkController();