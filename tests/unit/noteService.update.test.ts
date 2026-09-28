import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteService, NoteServiceImpl } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';


const mockRepo = {
  update: vi.fn(),
};

describe('NoteService - updateNote', () => {
  let noteService: NoteService;

  beforeEach(() => {
    vi.clearAllMocks();
    noteService = new NoteServiceImpl(mockRepo as unknown as NoteRepository);
  });

  it('debe actualizar parcialmente una nota y devolverla', () => {
    const id = 1;
    const patch = { title: 'Título actualizado' }; 
    const updatedNote = { 
      id: String(id), 
      title: 'Título actualizado', 
      content: 'Contenido intacto', 
      pinned: false, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    mockRepo.update.mockReturnValue(updatedNote);

    const result = noteService.updateNote(String(id), patch);

    expect(mockRepo.update).toHaveBeenCalledWith(String(id), patch);
    expect(mockRepo.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedNote);
    expect(result?.title).toBe('Título actualizado');
    expect(result?.content).toBe('Contenido intacto'); 
  });

  it('debe devolver undefined si la nota a actualizar no existe', () => {
    mockRepo.update.mockReturnValue(undefined);

    const result = noteService.updateNote(String(999), { content: 'Nuevo contenido' });

    expect(result).toBeUndefined();
  });
});