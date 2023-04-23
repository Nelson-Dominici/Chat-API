import unfriendService from '../services/friendOption/unfriendService.js';

class FriendOptionController {
    async unfriendUser(req, res) {
        await unfriendService.execute({
            userUuid: req.uuid,
            friendNumber: req.params.friendNumber,
        });

        return res.status(200).json({
            success: true,
        });
    }
}

export default new FriendOptionController();
