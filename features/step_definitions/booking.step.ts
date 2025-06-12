import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { BookingService, BookingData } from '../../src/services/BookingService';
import { AuthService } from '../../src/services/AuthService';
import { defaultBooking } from '../../src/testData/bookingData';
import { After } from '@cucumber/cucumber';

let createdBookingIds: number[] = [];
let bookingId: number;
let response: any;
const bookingData: BookingData = defaultBooking;

When('creo una reserva con datos válidos', async function () {
  response = await BookingService.createBooking(bookingData);
  if (response.body.bookingid) {
    bookingId = response.body.bookingid;
    createdBookingIds.push(bookingId);
  }
});

Then('recibo una respuesta de creación exitosa', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(response.body.bookingid);
  assert.strictEqual(response.body.booking.firstname, bookingData.firstname);
});

Given('existe una reserva creada', async function () {
  const res = await BookingService.createBooking(bookingData);
  if (res.body.bookingid) {
    bookingId = res.body.bookingid;
    createdBookingIds.push(bookingId);
  }
});

When('consulto la reserva por su id', async function () {
  response = await BookingService.getBooking(bookingId);
});

Then('recibo los datos de la reserva', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.firstname, bookingData.firstname);
});

When('actualizo la reserva con datos válidos', async function () {
  const auth = await AuthService.login('admin', 'password123');
  const token = auth.body.token;
  response = await BookingService.updateBooking(bookingId, token, { ...bookingData, firstname: "Jane" });
});

Then('recibo la reserva actualizada', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.firstname, "Jane");
});

When('elimino la reserva', async function () {
  const auth = await AuthService.login('admin', 'password123');
  const token = auth.body.token;
  response = await BookingService.deleteBooking(bookingId, token);
});

Then('la reserva ya no existe', async function () {
  assert.strictEqual(response.status, 201);
  const res = await BookingService.getBooking(bookingId);
  assert.strictEqual(res.status, 404);
});

When('consulto una reserva con id inexistente', async function () {
  response = await BookingService.getBooking(999999);
});

Then('recibo un error de reserva no encontrada', function () {
  assert.strictEqual(response.status, 404);
});

// PATCH
When('actualizo parcialmente la reserva con datos válidos', async function () {
  const auth = await AuthService.login('admin', 'password123');
  const token = auth.body.token;
  response = await BookingService.patchBooking(bookingId, token, { firstname: "Patched" });
});

Then('recibo la reserva parcialmente actualizada', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.firstname, "Patched");
});

// Unhappy Paths
When('creo una reserva con datos inválidos', async function () {
  response = await BookingService.createBooking({} as BookingData);
});

Then('recibo un error de validación', function () {
  assert.ok([400, 500].includes(response.status));
});

When('actualizo la reserva con un token inválido', async function () {
  response = await BookingService.updateBooking(bookingId, 'invalidtoken', { ...bookingData, firstname: "Hacker" });
});

Then('recibo un error de autorización', function () {
  assert.strictEqual(response.status, 403);
});

When('elimino la reserva con un token inválido', async function () {
  response = await BookingService.deleteBooking(bookingId, 'invalidtoken');
});

// GetBookingIds
When('consulto todos los IDs de reservas', async function () {
  response = await BookingService.getBookingIds();
});

Then('recibo una lista de IDs de reservas', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length > 0);
  assert.ok(response.body[0].bookingid !== undefined);
});

When('consulto los IDs de reservas filtrando por nombre y apellido', async function () {
  response = await BookingService.getBookingIds({
    firstname: bookingData.firstname,
    lastname: bookingData.lastname
  });
});

Then('recibo una lista de IDs que incluye la reserva creada', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(response.body));
  const ids = response.body.map((b: any) => b.bookingid);
  assert.ok(ids.includes(bookingId));
});

When('consulto los IDs de reservas filtrando por nombre inexistente', async function () {
  response = await BookingService.getBookingIds({ firstname: 'NombreQueNoExiste' });
});

Then('recibo una lista vacía de IDs', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.strictEqual(response.body.length, 0);
});

// Limpieza automática después de cada escenario:
After(async function () {
  if (createdBookingIds.length > 0) {
    const auth = await AuthService.login('admin', 'password123');
    const token = auth.body.token;
    for (const id of createdBookingIds) {
      await BookingService.deleteBooking(id, token);
    }
    createdBookingIds = [];
  }
});