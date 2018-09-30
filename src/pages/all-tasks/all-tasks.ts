import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html',
})
export class AllTasksPage {

  constructor(public navCtrl: NavController) {}

  openPageAddTask(): void {
    this.navCtrl.push('AddEditTaskPage');
  }

}
