import express from 'express'
import * as usersController from '../controllers/users.js'

const router = express.Router()

router.get('/:id', usersController.userDetail)

router.post('/', usersController.userCreate)

router.delete('/:id', usersController.userDelete)

router.patch('/:id', usersController.userUpdate)

export default router