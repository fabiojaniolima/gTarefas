import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditTaskPage } from './add-edit-task';

@NgModule({
  declarations: [
    AddEditTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditTaskPage),
  ],
})
export class AddEditTaskPageModule {}
