import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { NoteService } from '../../providers/note-service/note-service';
import { Data } from '../../models/data.model';
import { ViewNotePage } from '../view-note/view-note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public notes : Promise<Data[]>;
  private note: Data;

  constructor(public navCtrl: NavController, private noteService: NoteService) {  
  }

  ionViewWillEnter() {
    this.notes = this.getAllNotes();
  }

  addNote(){
    this.navCtrl.push(AddNotePage);
  }

  getNote(createDate: number) {
    this.noteService.getNote(createDate).then((n) => {
      this.note = n;
      this.navCtrl.push(ViewNotePage, { note: this.note })
    })
  }

  getAllNotes() {
    return this.noteService.getAllNotes();
  }

}
