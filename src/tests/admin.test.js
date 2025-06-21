const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

jest.setTimeout(20000); // 20 detik

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Admin Auth API', () => {
  it('registers a new admin', async () => {
    const res = await request(app)
      .post('/api/admins/register')
      .send({
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: 'test123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.admin.email).toBe('testadmin@example.com');
  });
});
