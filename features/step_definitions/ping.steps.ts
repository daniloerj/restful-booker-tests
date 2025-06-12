import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { PingService } from '../../src/services/PingService';

let response: any;

When('consulto el endpoint de ping', async function () {
  response = await PingService.ping();
});

Then('recibo una respuesta exitosa', function () {
  assert.strictEqual(response.status, 201);
});

When('consulto el endpoint de ping en una URL inválida', async function () {
  try {
    response = await PingService.pingInvalidUrl();
  } catch (error: any) {
    response = error;
  }
});

Then('recibo un error de conexión', function () {
  // Puede variar según el entorno, pero normalmente no es 201
  assert.notStrictEqual(response.status, 201);
});

Then('la respuesta llega en menos de {int} ms', function (maxMs: number) {
  assert.ok(response.duration < maxMs, `La respuesta demoró ${response.duration} ms`);
});