import { newError } from '../handlers/newError.js'

export const baseGetData = (id, dataArray, res, next) => {
    if (!id) {
        newError(next, 400)
    }

    const dataEl = dataArray.find(dataEl => dataEl.id === id)

    if (dataEl) {
        res
            .send({ data: dataEl})
    } else {
        newError(next, 404)
    }
}

export const baseDeleteData = (id, dataArray, res, next) => {
    const dataEl = dataArray.find(dataEl => dataEl.id === id)
    if (!dataEl) {
        newError(next, 404)
    }
    
    res
        .send({ data: dataArray.filter(dataEl => dataEl.id !== id) })
}