
export function internalErro(req, res){

    return res.status(500).json({
        status: "fatal",
        data: "Something Went Wrong",
    });

}