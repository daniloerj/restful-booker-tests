import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { AuthService } from '../../src/services/AuthService';

let response: any;

When('hago login con usuario válido', async function () {
  response = await AuthService.login('admin', 'password123');
});

Then('recibo un token de autenticación', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(response.body.token);
});

When('hago login con usuario inválido', async function () {
  response = await AuthService.login('admin', 'wrongpassword');
});

Then('recibo un error de autenticación', function () {
  assert.strictEqual(response.status, 200); // La API responde 200 incluso en error
  assert.ok(response.body.reason);
  assert.strictEqual(response.body.reason, 'Bad credentials');
});