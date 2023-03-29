import catchCelebrateError from "./catchCelebrateError.js";
import { AppError } from "#shared/appError.js";

export function errorHandle(error, req, res, next){
    console.log(error)
    const celebrateErrorMsg = catchCelebrateError.execute(error);

    if (error instanceof AppError) {

        return res.status(error.statusCode).json({
            status: "error",
            data: error.message,
        });

    }

    if(celebrateErrorMsg){

        return res.status(400).json({
            status: "error",
            data: celebrateErrorMsg,
        });
    }

    return res.status(500).json({
        status: "fatal",
        data: "Something Went Wrong",
    });

}