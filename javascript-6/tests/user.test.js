import { app } from '../app'
import request from 'supertest'
import { users } from '../mocks/users'

describe('GET /api/user/:id', () => {
    it('return user Biba', async () => {
      const response = await request(app).get(`/api/user/1`);
      const user = users.find(user => user.id === '1');
     
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(user);
    });
});