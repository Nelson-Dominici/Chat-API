import sendFriendReqService from "./services/friendRequest/sendFriendReqService.js";
import acceptFriendReqService from "./services/friendRequest/acceptFriendReqService.js";
import rejectFriendReqService from "./services/friendRequest/rejectFriendReqService.js";

class friendController {

	async sendFriendReq(req, res){

		const { receiverNumber } = req.body;
		const userUuid = req.uuid;

		await sendFriendReqService.send({
			userUuid,
			receiverNumber
		});

		res.status(200).json({

			status: "success",
			data: "Request sent successfully"

		});

	}

	async acceptFriendReq(req, res){

		const { requesterNumber } = req.body;
		const userUuid = req.uuid;

		const friendInfos = await acceptFriendReqService.accept({
			requesterNumber,
			userUuid
		});

		res.status(200).json({

			status: "success",
			data: friendInfos

		});

	}

	async rejectFriendReq(req, res){

		const { requesterNumber } = req.body;
		const userUuid = req.uuid;

		await rejectFriendReqService.reject({
			requesterNumber,
			userUuid
		});

		res.status(200).json({

			status: "success"

		});

	}

}

export default new friendController();