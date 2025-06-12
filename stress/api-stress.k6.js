import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20, // usuarios virtuales concurrentes
  duration: '30s', // duración total de la prueba
};

const BASE_URL = __ENV.BASE_URL || 'https://restful-booker.herokuapp.com';

export default function () {
  // 1. /ping
  let pingRes = http.get(`${BASE_URL}/ping`);
  check(pingRes, {
    'ping status 201': (r) => r.status === 201,
    'ping < 500ms': (r) => r.timings.duration < 500,
  });

  // 2. /auth (login)
  let authRes = http.post(`${BASE_URL}/auth`, JSON.stringify({
    username: 'admin',
    password: 'password123'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(authRes, {
    'auth status 200': (r) => r.status === 200,
    'auth has token': (r) => !!r.json('token'),
  });

  // 3. /booking (GET all)
  let bookingRes = http.get(`${BASE_URL}/booking`);
  check(bookingRes, {
    'booking status 200': (r) => r.status === 200,
    'booking < 1000ms': (r) => r.timings.duration < 1000,
    'booking is array': (r) => Array.isArray(r.json()),
  });

  // 4. /booking (POST create)
  let createRes = http.post(`${BASE_URL}/booking`, JSON.stringify({
    firstname: "Stress",
    lastname: "Test",
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-06-01",
      checkout: "2024-06-10"
    },
    additionalneeds: "Breakfast"
  }), { headers: { 'Content-Type': 'application/json' } });
  check(createRes, {
    'create booking status 200': (r) => r.status === 200,
    'create booking has id': (r) => !!r.json('bookingid'),
  });

  sleep(1);
}