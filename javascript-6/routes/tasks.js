import express from 'express'
import * as tasksController from '../controllers/tasks.js'

const router = express.Router()

router.get('/:id', tasksController.taskDetail)

router.post('/', tasksController.taskCreate)

router.delete('/:id', tasksController.taskDelete)

router.patch('/:id', tasksController.taskUpdate)

export default router