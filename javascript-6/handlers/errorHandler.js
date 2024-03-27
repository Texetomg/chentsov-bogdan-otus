const baseMessages = {
    404: 'Not found',
    400: 'Field is required',
    500: 'Error'
}

export const errorHandler = (err, req, res, next) => {
    console.log(err.status)
    const message = err.message || baseMessages[err.status]
    res
        .status(err.status || 500)
        .send({
            status: err.status,
            message
        })
}