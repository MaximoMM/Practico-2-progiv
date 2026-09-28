import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteService, NoteServiceImpl } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';

const mockRepo = {
  delete: vi.fn(),
};

describe('NoteService - deleteNote', () => {
  let noteService: NoteService;

  beforeEach(() => {
    vi.clearAllMocks();
    noteService = new NoteServiceImpl(mockRepo as unknown as NoteRepository);
  });

  it('debe eliminar una nota llamando al repositorio y devolver true', () => {
    const id = 1;
    mockRepo.delete.mockReturnValue(true);

    const result = noteService.deleteNote(String(id));

    expect(mockRepo.delete).toHaveBeenCalledWith(String(id));
    expect(mockRepo.delete).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('debe devolver false si la nota no se pudo eliminar', () => {
    mockRepo.delete.mockReturnValue(false);

    const result = noteService.deleteNote(String(999));

    expect(result).toBe(false);
  });
});