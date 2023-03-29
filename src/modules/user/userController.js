import registerService from "./services/userAccount/registerService.js";
import loginService from "./services/userAccount/loginService.js";
import authTokenService from "./services/auth/authTokenService.js";

class UserAccountController {
    
    async register(req, res) {
        const { name, email, password } = req.body;

        await registerService.execute({
            name,
            email,
            password
        });

        res.status(200).json({
            status: "success"
        });
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await loginService.execute({
            email,
            password
        });

        res.status(200).json({
            status: "success",
            data: user
        });
    }

    authToken(req, res) {
        const { token } = req.body;
        const authTokenService = new AuthTokenService();

        const decodeToken = authTokenService.execute(token);

        res.status(200).json({
            status: "success"
        });
    }

}

export default new UserAccountController();