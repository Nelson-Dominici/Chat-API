import renameService from '../services/editUser/renameService.js';

class EditUserController {
    async rename(req, res) {
        await renameService.execute({
            userUuid: req.uuid,
            newName: req.body.newName,
        });

        res.status(200).json({
            success: true,
        });
    }
}

export default new EditUserController();
