import request, { Response } from 'supertest';
import config from '../config';

const api = request(config.baseUrl);

export class PingService {
  static async ping(): Promise<Response & { duration: number }> {
    const start = Date.now();
    const res = await api.get('/ping');
    const duration = Date.now() - start;
    // Agrega la propiedad duration al objeto de respuesta
    return Object.assign(res, { duration });
  }

  static async pingInvalidUrl(): Promise<Response> {
    return request('http://localhost:9999').get('/ping');
  }
}