import { isCelebrateError } from "celebrate"

class CatchCelebrateError {
    execute(error) {

        if (isCelebrateError(error)) {
            const errorBody = error.details.get('body');

            const { details: [errorDetails] } = errorBody;
            const msg = errorDetails.message.replace(/"/g, "");

            return msg;
        }

        return false
    }
}

export default new CatchCelebrateError();