import sendService from '../services/friendMessage/sendService.js';
import deleteService from '../services/friendMessage/deleteService.js';
import getMsgsService from '../services/friendMessage/getMsgsService.js';

class FriendMsgController {
    async sendMessage(req, res) {
        await sendService.send({
            friendNumber: req.body.friendNumber,
            message: req.body.message,
            userNumber: req.number,
            userUuid: req.uuid,
        });

        return res.status(200).json({
            success: true,
        });
    }

    async deleteMessage(req, res) {
        await deleteService.delete({
            friendNumber: req.params.friendNumber,
            msgUuid: req.params.msgUuid,
            userNumber: req.number,
            userUuid: req.uuid,
        });

        return res.status(200).json({
            success: true,
        });
    }

    async getMessage(req, res) {
        const messages = await getMsgsService.get({
            friendNumber: req.params.friendNumber,
            skipQuery: req.query.skip,
            userUuid: req.uuid,
        });

        return res.status(200).json({
            success: true,
            data: messages,
        });
    }
}

export default new FriendMsgController();
