import express from 'express'
import * as tasksController from '../controllers/tasks.js'

const router = express.Router()

router.get('/:id', tasksController.detailTask)

router.post('/', tasksController.createTask)

router.delete('/:id', tasksController.deleteTask)

router.patch('/:id', tasksController.updateTask)

export default router