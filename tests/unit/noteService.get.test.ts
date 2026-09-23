import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';
import { Note } from '../../src/models/Note';

describe('NoteService - getNote (Ejercicio 3)', () => {
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

  it('debería retornar la nota si el ID existe', () => {
    const mockNote: Note = {
      id: 1,
      title: 'Nota de prueba',
      content: 'Contenido de prueba',
      pinned: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    vi.mocked(mockRepo.findById).mockReturnValue(mockNote);

    const result = service.getNote(1);

    expect(result).toEqual(mockNote);
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  it('debería retornar undefined si la nota no existe', () => {
    vi.mocked(mockRepo.findById).mockReturnValue(undefined);

    const result = service.getNote(999);

    expect(result).toBeUndefined();
    expect(mockRepo.findById).toHaveBeenCalledWith(999);
  });
});