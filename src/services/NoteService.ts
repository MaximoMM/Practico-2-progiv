import { NoteRepository } from '../repositories/NoteRepository';
import { Note, NewNote, NotePatch } from '../models/Note';
import { notify } from './notificationService';

export interface NoteService {
  createNote(data: NewNote): Note;
  listNotes(): Note[];
  getNote(id: number): Note | undefined;
  updateNote(id: number, patch: NotePatch): Note | undefined;
  deleteNote(id: number): boolean;
}

export class NoteServiceImpl implements NoteService {
  private nextId = 10;

  constructor(private readonly repo: NoteRepository) {}

createNote(data: NewNote): Note {
    const notaAcrear = {
      title: data.title,
      content: data.content,
      pinned: data.pinned ?? false
    };

    const notaCreada = this.repo.create(notaAcrear);

    const notaFinal = notaCreada ?? {
      id: Date.now(),
      ...notaAcrear,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (notaFinal.pinned) {
      notify(notaFinal);
    }

    return notaFinal;
  }

  listNotes(): Note[] {
    return this.repo.findAll();
  }

  getNote(id: number): Note | undefined {
    return this.repo.findById(Number(id));
  }

  updateNote(id: number, patch: NotePatch): Note | undefined {
    const updated = this.repo.update(Number(id), patch);
    return updated;
  }

  deleteNote(id: number): boolean {
    return this.repo.delete(Number(id));
  }
}