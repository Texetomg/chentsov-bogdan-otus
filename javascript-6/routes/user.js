import express from 'express'
import { users } from '../mocks/users.js'
import { newError } from '../handlers/newError.js'

const router = express.Router()

router.get('/:id', (req, res) => {
    const id = req.params.id

    if (!id) {
        newError(next, 400)
    }

    const user = users.find(user => user.id === id)

    if (user) {
        res
            .send({ data: user})
    } else {
        newError(next, 404)
    }
})

router.post('/', (req, res) => {
    const body = req.body
 
    if (!body.login) {
        newError(next, 400)
    }
    const newUser = { 
        id: users.length + 1,
        login: body.login,
        status: 'active'
    }
    users.push(body)

    res
        .send({ data: newUser })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === id)
    if (!user) {
        newError(next, 404)
    }
    
    res
        .send({ data: users.filter(user => user.id !== id) })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { login, status } = req.body
    const user = users.find(user => user.id === id)
    if (!user) {
        newError(next, 404)
    }
    
    const newUserData = {
        ...user,
        login: login ? login : user.login,
        status: status ? status : user.status
    }

    res
        .send({ data: newUserData })
})

export default router