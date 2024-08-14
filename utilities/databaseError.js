exports.databaseError = (res, status, message) => {
    res.status(status).json({
        status: 'failed',
        Error_Message: message,
    });
}