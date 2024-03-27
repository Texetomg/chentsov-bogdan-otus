export const newError = (next, status = 500 ) => {

    try {
        const error = new Error()
        error.status = status
        throw error
    } catch (err) {
        next(err)
    }
}