import { newError } from '../handlers/newError.js'
import { tasks } from '../mocks/tasks.js'
import { baseDeleteData, baseGetData } from './helpers.js'
import _ from 'lodash'

export const detailTask = (req, res, next) => {
    const id = _.toInteger(req.params.id, 10)

    baseGetData(id, tasks, res, next)
}

export const createTask = (req, res, next) => {
    const body = req.body

    if (!body.name || !body.description) {
        newError(next, 400)
    }
    const newTask = { 
        id: tasks.length + 1,
        name: body.name,
        description: body.description
    }
    tasks.push(newTask)

    res
        .send({ data: newTask })
}

export const deleteTask = (req, res, next) => {
    const id = _.toInteger(req.params.id, 10)
    baseDeleteData(id, tasks, res, next)
}

export const updateTask = (req, res, next) => {
    const id = _.toInteger(req.params.id, 10)
    const { name, status, description } = req.body
    const task = tasks.find(task => task.id === id)
    if (!task) {
        newError(next, 404)
    }
    
    const newTaskData = {
        ...task,
        name: name ? name : task.name,
        status: status ? status : task.status,
        description: description ? description : task.description
    }

    res
        .send({ data: newTaskData })
}