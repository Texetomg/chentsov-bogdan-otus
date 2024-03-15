import express from 'express'
import { users } from '../mocks/users.js'

const router = express.Router()

router.get('/:id', (req, res) => {
    const id = req.params.id

    if (!id) {
        res
            .status(500)
            .send({ error: 'id is requried'})
    }

    const user = users.find(user => user.id === id)

    if (user) {
        res
            .status(200)
            .send({ data: user})
    } else {
        res
            .status(404)
            .send({ error: 'no data'})
    }
})

router.post('/', (req, res) => {
    const body = req.body
    console.log(req)
    if (!body.login) {
        res
            .status(500)
            .send({ error: 'login is requried'})
    }
    const newUser = { 
        id: users.length + 1,
        login: body.login,
        status: 'active'
    }
    users.push(body)

    res
        .status(200)
        .send({ data: newUser })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === id)
    if (!user) {
        res
            .status(500)
            .send({ error: 'no user'})
    }
    
    res.status(200).send({ data: users.filter(user => user.id !== id) })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { login, status } = req.body
    const user = users.find(user => user.id === id)
    if (!user) {
        res
            .status(500)
            .send({ error: 'no user'})
    }
    
    const newUserData = {
        ...user,
        login: login ? login : user.login,
        status: status ? status : user.status
    }

    res.status(200).send({ data: newUserData })
})

export default router