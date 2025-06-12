import request, { Response } from 'supertest';
import config from '../config';

const api = request(config.baseUrl);

export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export class BookingService {
  static async createBooking(data: BookingData): Promise<Response> {
    return api
      .post('/booking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(data);
  }

  static async getBooking(id: number): Promise<Response> {
    return api.get(`/booking/${id}`).set('Accept', 'application/json');
  }

  static async updateBooking(id: number, token: string, data: BookingData): Promise<Response> {
    return api
      .put(`/booking/${id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Cookie', `token=${token}`)
      .send(data);
  }

  static async patchBooking(id: number, token: string, data: Partial<BookingData>): Promise<Response> {
    return api
      .patch(`/booking/${id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Cookie', `token=${token}`)
      .send(data);
  }

  static async deleteBooking(id: number, token: string): Promise<Response> {
    return api.delete(`/booking/${id}`).set('Cookie', `token=${token}`);
  }

  static async getBookingIds(params?: Record<string, string>): Promise<Response> {
    const query = params
      ? '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
      : '';
    return api.get(`/booking${query}`).set('Accept', 'application/json');
  }
}