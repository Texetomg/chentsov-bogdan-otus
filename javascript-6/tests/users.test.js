import { app } from '../app'
import request from 'supertest'
import { users } from '../mocks/users'

const route = '/api/users'

describe(`GET ${route}/:id`, () => {
    it('return user Biba', async () => {
      const response = await request(app).get(`${route}/1`)
      const user = users.find(user => user.id === 1)
     
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual(user)
    });

    it('return 404 on user with id 999', async () => {
      const response = await request(app).get(`${route}/999`)
     
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toEqual('Not found')
    });
});

describe(`POST ${route}`, () => {
  it('return new user Keka', async () => {
    const newUser = {
      id: users.length + 1,
      password: 123,
      login: 'Keka'
    }

    const response = await request(app).post(route).send(newUser)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(newUser)
  })

  it('return 400 with user without required fields', async () => {
    const newUser = {
      id: users.length + 1,
    }

    const response = await request(app).post(route).send(newUser)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual('Field is required')
  })
})

describe(`DELETE ${route}/:id`, () => {
  it(`delete user Biba`, async () => {
    const response = await request(app).delete(`${route}/1`)
    const filteredUsers = users.filter(user => user.id !== 1)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(filteredUsers)
  })

  it(`return 404 on user with id 999`, async () => {
    const response = await request(app).delete(`${route}/999`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toEqual('Not found')
  })
})

describe(`PATCH ${route}/:id`, () => {
  it(`update user Biba`, async () => {
    const newData = {
      login: 'Goga'
    }
    const response = await request(app).patch(`${route}/1`).send(newData)

    const updatedUser = {
      ...users.find(user => user.id === 1),
      ...newData
    }
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(updatedUser)
  })

  it(`return 404 on user with id 999`, async () => {
    const response = await request(app).delete(`${route}/999`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toEqual('Not found')
  })
})