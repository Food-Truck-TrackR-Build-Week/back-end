const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');

process.env = Object.assign(process.env, {
  JWT_SECRET:
    'say hard times you could find it aint the way that you want but its still alright'
});

describe('auth-router.test.js', () => {
  it('should set up testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
    expect(process.env.JWT_SECRET).toBe(
      'say hard times you could find it aint the way that you want but its still alright'
    );
  });
});

describe('auth-router', () => {
  let res = {};

  beforeAll(async () => {
    await db('users').truncate();
    await db('diners').truncate();
    await db('operators').truncate();
  });

  describe('POST /register/diner', () => {
    beforeAll(async () => {
      res = await request(server).post('/api/auth/register/diner').send({
        username: 'diner',
        password: 'password',
        email: 'diner@gmail.com'
      });
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });

    it('should return 201', () => {
      expect(res.status).toBe(201);
    });
  });
});
