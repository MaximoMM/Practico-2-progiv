import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteService } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';
import * as notificationService from '../../src/services/notificationService';

vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - notify (Ejercicio 6)', () => {
  let noteService: NoteService;
  let mockRepo: NoteRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    } as unknown as NoteRepository;

    noteService = new NoteService(mockRepo);
  });

  it('debe llamar a notify si se crea una nota con pinned: true', () => {
    const data = { title: 'Test', content: 'Nota fijada', pinned: true };

    const notaCreada = noteService.createNote(data);

    expect(notificationService.notify).toHaveBeenCalledWith(notaCreada);
    expect(notificationService.notify).toHaveBeenCalledTimes(1);
  });

  it('no debe llamar a notify si la nota se crea con pinned: false (o sin ese campo)', () => {
    const data = { title: 'Test 2', content: 'Nota común', pinned: false };

    noteService.createNote(data);

    expect(notificationService.notify).not.toHaveBeenCalled();
  });
});