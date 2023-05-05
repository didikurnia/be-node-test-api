// Error handler
const errorHandler = {};
// 400 Series
errorHandler.BadRequest = (res, err) => {
    res.status(400).json({ status: 'error', message: err });
};
errorHandler.Unauthorized = (res, err) => {
    res.status(401).json({ status: 'error', message: err || 'Unauthorized' });
};
errorHandler.NotFound = (res, err) => {
    res.status(404).json({ status: 'error', message: err });
};
errorHandler.UnHandler = (res, err) => {
    if (err.name == 'ValidationError') {
        let errorMessage;
        if (err.details) {
            errorMessage = err.details[0].message;
        } else {
            errorMessage = err.message;
        }

        res.status(400).json({ status: 'Bad Request', message: errorMessage });
    } else if (err.code === 'ENOENT') {
        res.status(400).json({ status: 'error', message: err.toString() });
    } else {
        const message = err.toString() || 'Something technically wrong';
        if (err.kind == 'ObjectId') {
            res.status(400).json({ status: 'error', message });
        } else {
            res.status(500).json({ status: 'error', message });
        }
    }
};
// 500 Series
errorHandler.ServerError = (res, err) => {
    // without sending error log to sentry
    res.status(500).json({ status: 'error', message: err });
};
errorHandler.NotImplemented = (res, err) => {
    res.status(501).json({ status: 'error', message: err });
};

module.exports = { errorHandler };
