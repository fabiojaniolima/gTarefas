import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Task } from "../../models/task";

@Injectable()
export class TaskProvider {

  constructor(public storage: Storage) {

  }

  getAll(reverse?: boolean): Promise<Task[]|void> {
    return this.storage.ready()
      .then((localForage: LocalForage) => {
        let tasks: Task[] = [];

        return this.storage.forEach((task: Task, key: string, iterationNumber: number) => {
          if(key.indexOf('tasks.') > -1 ) {
            tasks.push(task);
          }
        }).then(() => (!reverse) ? tasks : tasks.reverse());
      }).catch(err => console.log('Erro ao abrir o storage: ', err));
  }

  get(id: number): Promise<Task> {
    return this.storage.get(`tasks.${id}`);
  }

  create(task: Task): Promise<Task> {
    return this.storage.set(`tasks.${task.id}`, task);
  }

  update(task: Task): Promise<Task> {
    return this.create(task);
  }

  delete(id: number): Promise<boolean> {
    return this.storage.remove(`tasks.${id}`)
      .then(() => true);
  }
}
