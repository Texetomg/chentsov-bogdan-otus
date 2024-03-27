import express from 'express'
import * as usersController from '../controllers/users.js'

const router = express.Router()

router.get('/:id', usersController.detailUser)

router.post('/', usersController.createUser)

router.delete('/:id', usersController.deleteUser)

router.patch('/:id', usersController.updateUser)

export default router