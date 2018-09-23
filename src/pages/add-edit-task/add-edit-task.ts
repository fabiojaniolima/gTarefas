import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-edit-task',
  templateUrl: 'add-edit-task.html',
})
export class AddEditTaskPage {

  title: string;

  constructor(public navParams: NavParams) {
    this.title = (navParams.get('action') == 'edit') ? 'Editar tarefa' : 'Criar tarefa';
  }
}
