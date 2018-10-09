import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Data } from '../../models/data.model';

@Injectable()
export class NoteService {

  private notes: Data[]= [];
  private note: Data;

  constructor(public storage: Storage) {  }

  saveNote(note: Data) {
    note.createDate = Date.now();
    this.notes.push(note);
    this.storage.set('notes', this.notes);
  }

  getAllNotes() {
    return this.storage.get('notes').then(
      (notes) => {
        this.notes = notes == null ? [] : notes;
        return this.notes.slice();
      }
    )
  }

  getNote(createDate: number) {
    return this.storage.get('notes').then((notes) => {
      this.note = [...notes].find(r => r.createDate === createDate);
      return this.note;
    });
  }

  deleteNote(createDate: number) {
    this.notes = this.notes.filter((note) => {
      return note.createDate !== createDate
    });
    this.storage.set('notes', this.notes);
  }
}
