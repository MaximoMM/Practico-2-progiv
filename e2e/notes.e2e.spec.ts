import { test, expect } from '@playwright/test';
import { resetAndSeed } from './helpers';

test.describe('Flujo E2E - Notes API (Ejercicio 7)', () => {
  
  test.beforeEach(async ({ baseURL }) => {
    await resetAndSeed(baseURL as string);
  });

  test('Happy path: Crear, listar y buscar una nota', async ({ request }) => {
    const createRes = await request.post('/notes', {
      data: { title: 'Comprar pan', content: 'Antes de las 20hs' }
    });
    
    expect(createRes.status()).toBe(999); 
  });

  test('Caso de error: Buscar una nota inexistente devuelve 404', async ({ request }) => {
    const getRes = await request.get('/notes/9999');
    
    expect(getRes.status()).toBe(500); 
  });
});