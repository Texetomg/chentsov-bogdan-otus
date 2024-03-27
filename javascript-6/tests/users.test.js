import { app } from '../app'
import request from 'supertest'
import { users } from '../mocks/users'

const route = '/api/users'

describe(`GET ${route}/:id`, () => {
    it('return user by id', async () => {
      const response = await request(app).get(`${route}/1`)
      const user = users.find(user => user.id === 1)
     
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual(user)
    });

    it('return an error for a user with a non-existent id', async () => {
      const response = await request(app).get(`${route}/999`)
     
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toEqual('Not found')
    });
});

describe(`POST ${route}`, () => {
  it('return new user', async () => {
    const newUser = {
      id: users.length + 1,
      password: 123,
      login: 'Keka'
    }

    const response = await request(app).post(route).send(newUser)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(newUser)
  })

  it('return an error for a user without required fields', async () => {
    const newUser = {
      id: users.length + 1,
    }

    const response = await request(app).post(route).send(newUser)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual('Field is required')
  })
})

describe(`DELETE ${route}/:id`, () => {
  it(`delete user by id`, async () => {
    const response = await request(app).delete(`${route}/1`)
    const filteredUsers = users.filter(user => user.id !== 1)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(filteredUsers)
  })

  it(`return an error for a user with a non-existent ID`, async () => {
    const response = await request(app).delete(`${route}/999`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toEqual('Not found')
  })
})

describe(`PATCH ${route}/:id`, () => {
  it(`update user by id`, async () => {
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

  it(`return an error for a user with a non-existent ID`, async () => {
    const response = await request(app).delete(`${route}/999`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toEqual('Not found')
  })
})