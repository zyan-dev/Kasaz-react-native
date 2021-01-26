const request = require('supertest');
const app = require('./index');

describe('testing-server-routes', () => {
  it('POST /fetch - success', async () => {
    const { body } = await request(app).post('/fetch').send({
      minPrice: 350,
      maxPrice: 10000,
      minSquare: 350,
      maxSquare: 10000,
      bedrooms: 1,
    });
    expect(body).toHaveProperty('result');
    expect(body.result).toHaveLength(1);
  });
});
