import { Component } from '@angular/core';
import { AlertController, ItemSliding, NavController } from 'ionic-angular';

@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html',
})
export class AllTasksPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  openAddEditTaskPage(): void {
    this.navCtrl.push('AddEditTaskPage');
  }

  dialogDeleteTask(slidingItem: ItemSliding) {
    const confirm = this.alertCtrl.create({
      title: 'Deletar tarefa!',
      message: '<strong>Atenção</strong>: Essa ação não tem como ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Deletar',
          handler: () => {
            slidingItem.close();
          }
        }
      ]
    });
    confirm.present();
  }
}
