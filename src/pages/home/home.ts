import { Component } from '@angular/core';
import { AlertController, ItemSliding, NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  openAddEditTaskPage(action: any): void {
    this.navCtrl.push('AddEditTaskPage', action);
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
