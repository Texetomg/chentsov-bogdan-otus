import { app } from '../app'
import request from 'supertest'
import { tasks } from '../mocks/tasks'

const route = '/api/tasks'

describe(`GET ${route}/:id`, () => {
    it('return task Biba', async () => {
      const response = await request(app).get(`${route}/1`)
      const task = tasks.find(task => task.id === 1)
     
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual(task)
    });

    it('return 404 on task with id 999', async () => {
      const response = await request(app).get(`${route}/999`)
     
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toEqual('Not found')
    });
});

describe(`POST ${route}`, () => {
  it('return new task Keka', async () => {
    const newUser = {
      id: tasks.length + 1,
      name: 'Keka',
      description: 'Keka'
    }

    const response = await request(app).post(route).send(newUser)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(newUser)
  })

  it('return 400 with task without required fields', async () => {
    const newUser = {
      id: tasks.length + 1,
    }

    const response = await request(app).post(route).send(newUser)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual('Field is required')
  })
})

describe(`DELETE ${route}/:id`, () => {
  it(`delete task Biba`, async () => {
    const response = await request(app).delete(`${route}/1`)
    const filteredUsers = tasks.filter(task => task.id !== 1)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(filteredUsers)
  })

  it(`return 404 on task with id 999`, async () => {
    const response = await request(app).delete(`${route}/999`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toEqual('Not found')
  })
})

describe(`PATCH ${route}/:id`, () => {
  it(`update task Biba`, async () => {
    const newData = {
      name: 'Goga'
    }
    const response = await request(app).patch(`${route}/1`).send(newData)

    const updatedUser = {
      ...tasks.find(task => task.id === 1),
      ...newData
    }
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(updatedUser)
  })

  it(`return 404 on task with id 999`, async () => {
    const response = await request(app).delete(`${route}/999`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toEqual('Not found')
  })
})