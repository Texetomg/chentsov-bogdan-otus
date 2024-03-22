import express from 'express'
import { tasks } from '../mocks/tasks.js'
import { newError } from '../handlers/newError.js'

const router = express.Router()

router.get('/:id', (req, res, next) => {
    const id = req.params.id

    const task = tasks.find(task => task.id === id)

    if (task) {
        res
            .send({ data: task})
    } else {
        newError(next, 404)
    }
})

router.post('/', (req, res, next) => {
    const body = req.body

    if (!body.name) {
        newError(next, 400)
    }
    const newTask = { 
        id: tasks.length + 1,
        name: body.name,
        status: 'done'
    }
    tasks.push(newTask)

    res
        .send({ data: newTask })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const task = tasks.find(task => task.id === id)
    if (!task) {
        newError(next, 404)
    }
    
    res
        .send({ data: tasks.filter(task => task.id !== id) })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { name, status } = req.body
    const task = tasks.find(task => task.id === id)
    if (!task) {
        newError(next, 404)
    }
    
    const newTaskData = {
        ...task,
        name: name ? name : task.name,
        status: status ? status : task.status
    }

    res
        .send({ data: newTaskData })
})

export default router