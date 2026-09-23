import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';
import { Note } from '../../src/models/Note';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  let mockRepo: NoteRepository;
  let service: NoteServiceImpl;

  beforeEach(() => {
    mockRepo = {
      findAll: vi.fn(),
      findById: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    } as unknown as NoteRepository;
    service = new NoteServiceImpl(mockRepo);
  });

  it('debería retornar una lista vacía cuando no hay notas', () => {
    vi.mocked(mockRepo.findAll).mockReturnValue([]);

    const result = service.listNotes();

    expect(result).toEqual([]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    // Forzamos el fallo inicial para el commit en ROJO
    expect(true).toBe(false);
  });

  it('debería retornar todas las notas existentes', () => {
    const mockNotes: Note[] = [
      {
        id: 1,
        title: 'Nota 1',
        content: 'Contenido 1',
        pinned: false,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        title: 'Nota 2',
        content: 'Contenido 2',
        pinned: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ];

    vi.mocked(mockRepo.findAll).mockReturnValue(mockNotes);

    const result = service.listNotes();

    expect(result).toEqual(mockNotes);
    expect(result).toHaveLength(2);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });
});