import registerService from '../services/userAccount/registerService.js';
import authTokenService from '../services/userAccount/authTokenService.js';
import loginService from '../services/userAccount/loginService.js';
import deleteService from '../services/userAccount/deleteService.js';

class UserAccountController {
    async register(req, res) {
        await registerService.execute(req.body);

        res.status(200).json({
            success: true,
        });
    }

    async login(req, res) {
        const data = await loginService.execute(req.body);

        res.status(200).json({
            success: true,
            data,
        });
    }

    async deleteAccount(req, res) {
        await deleteService.delete(req.uuid);

        res.status(200).json({
            success: true,
        });
    }

    authToken(req, res) {
        authTokenService.execute(req.body);

        res.status(200).json({
            success: true,
        });
    }
}

export default new UserAccountController();
