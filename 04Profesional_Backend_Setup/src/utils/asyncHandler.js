// Promises Approach
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.then(requestHandler(req, res, next)).catch((err) => next(err))
    }
}




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// Try Catch Approach
/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message,
        });
    }
};
*/

export { asyncHandler };
