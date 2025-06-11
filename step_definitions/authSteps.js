const { When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const assert = require('assert');

let response;

When('hago login con usuario válido', async function () {
  response = await request('https://restful-booker.herokuapp.com')
    .post('/auth')
    .send({ username: 'admin', password: 'password123' });
});

Then('recibo un token de autenticación', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(response.body.token);
});