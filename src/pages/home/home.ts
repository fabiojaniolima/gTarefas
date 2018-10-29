import { Component } from '@angular/core';
import { Loading, LoadingController, ItemSliding, AlertOptions, AlertController, NavController } from 'ionic-angular';
import { Task } from "../../models/task";
import { TaskProvider } from "../../providers/task/task";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tasks: Task[] = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public taskProvider: TaskProvider
  ) {}

  /*
  openPageAddTask(): void {
    this.navCtrl.push('AddEditTaskPage');
  }
  */

  ionViewDidLoad() {
    this.taskProvider.getAll(true)
      .then((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  onSave(type: string, ItemSliding?: ItemSliding, task?: Task): void {
    let title: string = type.charAt(0).toUpperCase() + type.substr(1);
    let options = {
      title: `${(title == 'Create' ? 'Criar' : 'Editar') } tarefa`,
      itemSliding: ItemSliding,
      type: type
    };
    this.showAlert(options, task);
  }

  onDelete(task: Task): void {
    this.alertCtrl.create({
      title: `Deletar a tarefa '${task.title}'?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            let loading: Loading = this.showLoading(`Deletando tarefa: ${task.title}`);

            this.taskProvider.delete(task.id)
              .then((deleted: boolean) => {
                this.tasks.splice(this.tasks.indexOf(task), 1);
                loading.dismiss();
              });
          }
        },
        'Não'
      ]
    }).present();
  }

  private showAlert(options: {itemSliding: ItemSliding, title: string, type: string}, task?: Task): void {

    let alertOptions: AlertOptions = {
      title: options.title,
      inputs: [
        {
          name: 'title',
          placeholder: 'Nome da tarefa'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {

            let loading: Loading = this.showLoading(`Salvando tarefa: ${data.title}`);
            let contextTask: Task;

            switch(options.type) {
              case 'create':
                contextTask = new Task(data.title);
                break;
              case 'update':
                task.title = data.title;
                contextTask = task;
                break;
            }

            this.taskProvider[options.type](contextTask)
              .then((savedTask: Task) => {
                if (options.type === 'create') this.tasks.unshift(savedTask);
                loading.dismiss();
                if (options.itemSliding) options.itemSliding.close();
              });

          }
        }
      ]
    };

    if (options.type === 'update') {
      alertOptions.inputs[0].value = task.title;
    }

    this.alertCtrl.create(alertOptions).present();

  }

  private showLoading(message?: string): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: message || 'Aguarde...'
    });
    loading.present();
    return loading;
  }
}
