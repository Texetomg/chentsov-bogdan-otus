import { newError } from '../handlers/newError.js'
import { users } from '../mocks/users.js'
import { baseDeleteData, baseGetData } from './helpers.js'
import _ from 'lodash'

export const userDetail = (req, res, next) => {
    const id = _.toInteger(req.params.id, 10)

   baseGetData(id, users, res, next)
}

export const userCreate = (req, res, next) => {
    const body = req.body
 
    if (!body.login || !body.password) {
        newError(next, 400)
    }
    const newUser = { 
        id: users.length + 1,
        login: body.login,
        password: body.password,
    }
    users.push(body)

    res
        .send({ data: newUser })
}

export const userDelete = (req, res, next) => {
    const id = _.toInteger(req.params.id, 10)
    baseDeleteData(id, users, res, next)
}

export const userUpdate = (req, res, next) => {
    const id = _.toInteger(req.params.id, 10)
    const { login, status, name } = req.body
    const user = users.find(user => user.id === id)
    if (!user) {
        newError(next, 404)
    }
    
    const newUserData = {
        ...user,
        login: login ? login : user.login,
        status: status ? status : user.status,
        name: name ? name: user.name
    }

    res
        .send({ data: newUserData })
}