export function pageNotFound(req, res) {
    return res.status(404).json({
        success: false,
        data: { message: 'Something Went Wrong' },
    });
}
