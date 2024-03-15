import express from 'express'
import { tasks } from '../mocks/tasks.js'

const router = express.Router()

router.get('/:id', (req, res) => {
    const id = req.params.id

    if (!id) {
        res
            .status(500)
            .send({ error: 'id is requried'})
    }

    const task = tasks.find(task => task.id === id)

    if (task) {
        res
            .status(200)
            .send({ data: task})
    } else {
        res
            .status(404)
            .send({ error: 'no data'})
    }
})

router.post('/', (req, res) => {
    const body = req.body
    console.log(req)
    if (!body.name) {
        res
            .status(500)
            .send({ error: 'name is requried'})
    }
    const newTask = { 
        id: tasks.length + 1,
        name: body.name,
        status: 'done'
    }
    users.push(newTask)

    res
        .status(200)
        .send({ data: newTask })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const task = tasks.find(task => task.id === id)
    if (!task) {
        res
            .status(500)
            .send({ error: 'no task'})
    }
    
    res.status(200).send({ data: tasks.filter(task => task.id !== id) })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const { name, status } = req.body
    const task = tasks.find(task => task.id === id)
    if (!task) {
        res
            .status(500)
            .send({ error: 'no task'})
    }
    
    const newTaskData = {
        ...task,
        name: name ? name : task.name,
        status: status ? status : task.status
    }

    res.status(200).send({ data: newTaskData })
})

export default router