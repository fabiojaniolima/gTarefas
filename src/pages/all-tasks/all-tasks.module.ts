import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllTasksPage } from './all-tasks';

@NgModule({
  declarations: [
    AllTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(AllTasksPage),
  ],
})
export class AllTasksPageModule {}
