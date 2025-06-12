import request, { Response } from 'supertest';
import config from '../config';

const api = request(config.baseUrl);

export class AuthService {
  static async login(username: string, password: string): Promise<Response> {
    return api
      .post('/auth')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ username, password });
  }
}