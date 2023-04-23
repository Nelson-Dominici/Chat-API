import sendService from '../services/friendRequest/sendService.js';
import acceptService from '../services/friendRequest/acceptService.js';
import rejectService from '../services/friendRequest/rejectService.js';

class FriendReqController {
    async sendFriendReq(req, res) {
        await sendService.send({
            userUuid: req.uuid,
            receiverNumber: req.body.receiverNumber,
        });

        res.status(200).json({
            success: true,
        });
    }

    async acceptFriendReq(req, res) {
        const friendInfos = await acceptService.accept({
            requesterNumber: req.body.requesterNumber,
            userUuid: req.uuid,
        });

        res.status(200).json({
            success: true,
            data: friendInfos,
        });
    }

    async rejectFriendReq(req, res) {
        await rejectService.reject({
            requesterNumber: req.params.requesterNumber,
            userUuid: req.uuid,
        });

        res.status(200).json({
            success: true,
        });
    }
}

export default new FriendReqController();
