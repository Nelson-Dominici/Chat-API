import { AppError } from '#shared/appError.js';

export function errorHandle(error, req, res, next) {
    console.log(error);
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            data: { message: error.message },
        });
    }

    return res.status(500).json({
        success: false,
        data: { message: 'Something Went Wrong' },
    });
}
