import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@IonicPage()
@Component({
  selector: 'page-add-edit-task',
  templateUrl: 'add-edit-task.html',
})
export class AddEditTaskPage {

  public title: string;
  public note: string;

  constructor(private sqlite: SQLite) {}

  insert() {
    this.sqlite.create({
      name: 'database.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('insert into task (title) values (?)', [this.title])
        .then(res => {
          console.log(res);
          console.log(`Tarefa: '${this.note}' inserida`)
        })
        .catch(e => {
          console.log(e);
        });
    }).catch(e => {
      console.log(e);
    });
  }

}
