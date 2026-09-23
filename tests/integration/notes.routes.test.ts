import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('GET /notes/:id (Ejercicio 3)', () => {
  const app = makeApp(':memory:');

  it('debería retornar 404 si la nota no existe', async () => {
    const response = await request(app).get('/notes/9999');
    expect(response.status).toBe(404);
  });
});